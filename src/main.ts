import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './users/pipes/validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8081;

  const config = new DocumentBuilder()
    .setTitle('Neobis-React-Auth')
    .setDescription('The registration and authentication API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.log(`Server has been started on PORT: ${PORT}`);
  });
}
bootstrap();
