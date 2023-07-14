import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';
import { OrderDTO } from './order.dto';
import { OrderStatus } from '.prisma/client/orders';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject('ORDERS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  all() {
    return this.prisma.order.findMany();
  }

  async create(data: OrderDTO) {
    const order = await this.prisma.order.create({
      data: {
        ...data,
        status: OrderStatus.PENDING,
      },
    });

    await lastValueFrom(this.kafkaClient.emit('orders', order));
    return order;
  }
}
