import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MemoryStoredFile } from 'nestjs-form-data';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UploadService {
  constructor(@Inject('MAIN_SERVICE') private client: ClientProxy) {}

  async upload(file: MemoryStoredFile) {
    const res = await lastValueFrom(
      this.client.send(
        { cmd: 'upload' },
        {
          ...file,
          buffer: file.buffer.toString('base64'),
        },
      ),
    );
    return res;
  }
}
