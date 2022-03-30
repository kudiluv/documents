import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RpcValidationFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {
        host: 'documents_main',
        port: 3001,
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcValidationFilter());
  await app.listen();
}
bootstrap();
