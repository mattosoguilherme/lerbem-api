import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Lerbem API')
    .setDescription('API para o projeto Lerbem')
    .setVersion('1.0')
    .addTag('LERBEM')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const porta = 3030;
  await app.listen(process.env.PORT || porta),
    () => {
      console.log(
        `Server is running on address: http://localhost:${porta}/api `,
      );
    };

  await app.listen(3000);
}
bootstrap().catch((err) => console.error(`Deu ruim ` + err));
