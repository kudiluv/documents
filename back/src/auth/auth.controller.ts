import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login() {
    return true;
  }

  @Post('test')
  async test() {
    return new Promise((resolve) =>
      setTimeout(() => resolve('success'), 20000),
    );
  }
}
