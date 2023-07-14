import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  const configDoc = new DocumentBuilder()
    .setTitle('[Webstore Microsservices] - Orders')
    .setDescription('Orders Microsservice that handle orders.')
    .setVersion('1.0')
    .addTag('Orders')
    .setContact(
      'Samuel Ricardo',
      'https://www.linkedin.com/in/samuel-ricardo/',
      'samuelricardoofficial@gmail.com',
    )
    .setLicense(
      'MIT',
      'https://github.com/Samuel-Ricardo/webstore_api/blob/main/LICENSE',
    )
    .build();

  const docs = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('docs/orders', app, docs);

  await app.listen(3000);
}
bootstrap();
