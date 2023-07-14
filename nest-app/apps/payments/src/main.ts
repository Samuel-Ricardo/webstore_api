import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  const configDoc = new DocumentBuilder()
    .setTitle('Payments')
    .setDescription('The payments microsservice that handle payments')
    .setVersion('1.0')
    .addTag('payments')
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

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('docs/payments', app, document);

  await app.listen(3000);
}
bootstrap();
