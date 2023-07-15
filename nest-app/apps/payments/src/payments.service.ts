import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentDTO } from './payments.dto';
import { PaymentStatus } from '.prisma/client/payments';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    @Inject('PAYMENTS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  all() {
    return this.prisma.payment.findMany();
  }

  async payment(data: PaymentDTO) {
    const payment = await this.prisma.payment.create({
      data: {
        ...data,
        status: PaymentStatus.APPROVED,
      },
    });
    await lastValueFrom(this.kafkaClient.emit('payments', payment));
    return payment;
  }
}
