import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable, Scope } from '@nestjs/common';
import { StorageConfig } from '../config';
import createUniqueFileName from '../utils/createUniqueFileName';
import * as path from 'path';
import { IStorage } from '../types/storage.interface';
import { File } from '../types/file';
import { UploadedFile } from '../types/uploaded.file';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class GoogleService implements IStorage {
  private storage: Storage;
  private bucket: Bucket;
  constructor(config: StorageConfig, bucketName: string) {
    this.storage = new Storage(config.googleOptions);
    this.bucket = this.storage.bucket(bucketName);
  }
  uploadBuffer: (file: File) => Promise<UploadedFile>;
  downloadFile: (fileName: string) => Promise<void>;

  async uploadFile(filePath: string): Promise<UploadedFile> {
    const fileName = createUniqueFileName(filePath);
    await this.bucket.upload(filePath, {
      destination: fileName,
    });
    const url = this.bucket.file(fileName).publicUrl();
    return {
      name: fileName,
      location: url,
    };
  }
  async deleteFile(filePath: string): Promise<void> {
    const fileName = path.basename(filePath);
    await this.bucket.file(fileName).delete({ ignoreNotFound: true });
  }
}
