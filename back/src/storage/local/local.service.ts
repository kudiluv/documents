import { Injectable, Scope } from '@nestjs/common';
import { StorageConfig } from '../config';
import createUniqueFileName from '../utils/createUniqueFileName';
import * as path from 'path';
import { IStorage } from '../types/storage.interface';
import { File } from '../types/file';
import { UploadedFile } from '../types/uploaded.file';
import { LocalConfig } from '../types/local.config';
import * as fs from 'fs/promises';
import { debug } from 'console';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LocalService implements IStorage {
  private config: LocalConfig;
  private bucket: string;
  private folder: string;

  constructor(config: StorageConfig, bucketName: string) {
    this.bucket = bucketName;
    this.config = config.localOptions;
    this.folder = `${this.config.path}/${this.bucket}/`;
    this.init();
  }

  async init() {
    try {
      await fs.stat(this.folder);
    } catch (error) {
      debug('folder not found and has been created');
      fs.mkdir(this.folder);
    }
  }

  async uploadBuffer(file: File): Promise<UploadedFile> {
    const fileName = createUniqueFileName(file.originalName);
    const path = this.folder + fileName;
    await fs.writeFile(path, file.buffer);
    return {
      location: path,
      name: fileName,
    };
  }

  downloadFile: (fileName: string) => Promise<void>;

  async uploadFile(filePath: string): Promise<UploadedFile> {
    const fileName = createUniqueFileName(filePath);
    const file = await fs.readFile(filePath);
    const path = this.folder + fileName;
    await fs.writeFile(path, Buffer.from(file.buffer));
    return {
      location: path,
      name: fileName,
    };
  }

  async deleteFile(filePath: string): Promise<void> {
    const fileName = path.basename(filePath);
    await fs.unlink(this.folder + fileName);
  }
}
