import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: 'payments-consumer',
      },
    },
  });

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

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
