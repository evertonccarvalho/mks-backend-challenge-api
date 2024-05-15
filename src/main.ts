import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { applyGlobalConfig } from './global-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MKS - API')
    .setDescription(
      'Desenvolva um sistema de autenticação JWT. Você deve construir uma CRUD de um catálogo de filmes. Todos os endpoints dessa CRUD só devem ser consumidos por um usuário autenticado.',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'Infomar o JWT para autorizar o acesso',
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  applyGlobalConfig(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
