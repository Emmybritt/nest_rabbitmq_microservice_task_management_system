import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Task management system')
    .setDescription('This is a task management system')
    .setVersion('1.0')
    .addTag('task', 'managment')
    .addServer('/api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
