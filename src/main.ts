import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cowSay from 'cowsay';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new ConfigService();

  const docConfig = new DocumentBuilder()
    .setTitle('Return0 API')
    .setDescription('Return0 API api doc')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get('PORT'));

  const cow = cowSay.say({
    text: `Server running: ${config.get('APP_URL')} | ${config.get(
      'APP_URL',
    )}/docs`,
    e: 'oO',
    T: 'U ',
  });

  console.log(cow);
}
bootstrap();
