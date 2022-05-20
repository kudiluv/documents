import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  username = process.env.HTTP_BASIC_USER || 'root';
  password = process.env.HTTP_BASIC_PASS || '';
}
