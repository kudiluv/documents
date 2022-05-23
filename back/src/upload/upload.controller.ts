import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ValidationFilePipe } from './validation.file.pipe';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addFile(@UploadedFile(ValidationFilePipe) file: Express.Multer.File) {
    return await this.uploadService.upload(file);
  }
}
