import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UploadService } from './upload.service';
import { FileDto } from './dto/file.dto';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @MessagePattern({ cmd: 'upload' })
  async upload(@Body() file: FileDto) {
    return this.uploadService.upload(file);
  }
}
