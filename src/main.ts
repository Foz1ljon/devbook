import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cors({
      origin: '*', // Allow requests from this origin
      credentials: true, // Allow credentials (cookies, headers, etc.)
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('DevBook.uz')
    .setDescription('Nest.Js MongoDB REST API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(env.PORT, () =>
    console.log('Listening on port ' + env.PORT),
  );
}
bootstrap().catch((err) => {
  console.log(err.message);
});
