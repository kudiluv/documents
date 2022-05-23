import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const nestOptions: NestApplicationOptions = {};
  if (process.env.SSH_KEY && process.env.SSH_CERT) {
    nestOptions.httpsOptions = {
      key: fs.readFileSync(process.env.SSH_KEY),
      cert: fs.readFileSync(process.env.SSK_CERT),
    };
  }
  const app = await NestFactory.create(AppModule, nestOptions);
  nestOptions.cors = true;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
