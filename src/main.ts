import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import customCss from './config/swagger-material.theme';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { CompanyModule } from './companies/companies.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // #endregion Swagger Documentation
  app.setGlobalPrefix('/v1');

  // swagger documentation configuration
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Chiip Main Server')
    .setVersion('1.0')
    .addTag(
      'Users',
      'Operations linked to reading and updating users information.',
    )
    .addTag(
      'Companies',
      'Operations linked to reading and updating companies information.',
    )
    .addTag('Auth', 'Operations linked to user authentication and creation.')
    .addApiKey({type: 'apiKey', name: 'X-API-KEY', in: 'header'}, 'X-API-KEY')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [AuthModule, UsersModule, CompanyModule],
  });
  SwaggerModule.setup('/v1/docs', app, document, {
    customCss,
  });
  
  // Implement global middlewares
  app.use(json({ limit: '50mb' }));
  // Implement application level pipes
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: true }),
  );

  // start app
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
