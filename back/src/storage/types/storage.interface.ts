import { File } from './file';
import { UploadedFile } from './uploaded.file';

export interface IStorage {
  uploadFile: (path: string) => Promise<UploadedFile>;
  uploadBuffer: (file: File) => Promise<UploadedFile>;
  deleteFile: (fileName: string) => Promise<void>;
  downloadFile: (fileName: string) => Promise<any>;
}
