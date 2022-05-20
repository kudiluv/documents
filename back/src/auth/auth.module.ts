import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from './config.service';
import { BasicStrategy } from './basic.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [BasicStrategy, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
