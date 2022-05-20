import { applyDecorators, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from './basic-auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(BasicAuthGuard));
}
