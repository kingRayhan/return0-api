import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cowSay from 'cowsay';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { QueryErrorFilter } from './common/utils/filters/mongoose.filter';
import { ClassValidatorPipe } from './common/utils/pipes/ClassValidatorPipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 

  app.useGlobalPipes(new ClassValidatorPipe());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new QueryErrorFilter());


  const config = new ConfigService();
  app.enableCors({ origin: '*' });
  const docConfig = new DocumentBuilder()
    .setTitle('Return0 API')
    .setDescription('Return0 API api doc')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(config.get('PORT'));

  const cow = cowSay.say({
    text: `Server running: ${config.get('APP_URL')} | ${config.get(
      'API_DOC_URL',
    )}`,
    e: 'oO',
    T: 'U ',
  });

  console.log(cow);
}
bootstrap();
