import { Injectable } from '@nestjs/common';
import { Categories } from './types/categories';

@Injectable()
export class CategoryService {
  getCategory(mime: string): Categories {
    // image
    if (mime.includes('image')) return Categories.image;

    // audio
    if (mime.includes('audio')) return Categories.audio;

    // video
    if (mime.includes('video')) return Categories.video;

    // documents
    if (
      mime === 'application/msword' ||
      mime ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mime.includes('text')
    )
      return Categories.document;

    // tables
    if (
      mime ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      mime === 'application/vnd.ms-excel'
    )
      return Categories.tables;
    if (mime === 'application/pdf') return Categories.pdf;

    // presentation
    if (
      mime ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      mime === 'application/vnd.ms-powerpoint'
    )
      return Categories.presentation;
    return Categories.any;
  }
}
