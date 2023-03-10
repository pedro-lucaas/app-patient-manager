import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  try {

    const app = await NestFactory.create(AppModule, {
      cors: {
        origin: '*',
      }
    });

    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    throw new Error(error);
  }
}
bootstrap();
