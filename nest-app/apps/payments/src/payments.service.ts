import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';

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
}
