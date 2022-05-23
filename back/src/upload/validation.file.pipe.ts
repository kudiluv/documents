import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';

export class ValidationFilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
