import { Body, Controller, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from './dto/file.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @FormDataRequest()
  async addFile(@Body() fileDto: FileDto) {
    return await this.uploadService.upload(fileDto.file);
  }
}
