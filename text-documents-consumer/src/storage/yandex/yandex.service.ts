import { Injectable, Scope } from '@nestjs/common';
import { StorageConfig } from '../config';
import { IStorage } from '../types/storage.interface';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import fsPromises from 'fs/promises';
import createUniqueFileName from '../utils/createUniqueFileName';
import { File } from '../types/file';
import { UploadedFile } from '../types/uploaded.file';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class YandexService implements IStorage {
  private bucket: string;
  private client: S3;
  constructor(config: StorageConfig, bucketName: string) {
    this.client = new S3(config.s3config);
    this.bucket = bucketName;
  }
  async uploadBuffer(file: File): Promise<UploadedFile> {
    const fileName = createUniqueFileName(file.originalName);
    const result = await this.client
      .upload({
        Bucket: this.bucket,
        Body: file.buffer,
        Key: fileName,
      })
      .promise();
    return {
      location: result.Location,
      name: fileName,
    };
  }

  async downloadFile(fileName: string) {
    return await new Promise<string>((resolve, reject) => {
      const filePath = `/tmp/${fileName}`;
      const fileWriteStream = fs.createWriteStream(`/tmp/${fileName}`);
      const fileReadStream = this.client
        .getObject({ Bucket: this.bucket, Key: fileName })
        .createReadStream();
      fileReadStream.pipe(fileWriteStream);
      fileReadStream.on('end', () => {
        fileWriteStream.close();
        resolve(filePath);
      });
    });
  }

  async uploadFile(path: string): Promise<UploadedFile> {
    const fileName = createUniqueFileName(path);
    const result = await this.client
      .upload({
        Bucket: this.bucket,
        Key: fileName,
        Body: fs.readFileSync(path),
      })
      .promise();
    return {
      location: result.Location,
      name: fileName,
    };
  }

  async deleteFile(name: string) {
    await this.client
      .deleteObject({ Bucket: this.bucket, Key: name })
      .promise();
  }
}
