import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './order.dto';
import { OrderStatus } from '.prisma/client/orders';
import { PaymentStatus } from '.prisma/client/payments';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/hello')
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Get()
  all() {
    return this.ordersService.all();
  }

  @Post()
  async create(@Body() data: OrderDTO) {
    return this.ordersService.create(data);
  }

  @MessagePattern('payments')
  async complete(@Payload() message: { order_id: number; status: string }) {
    console.log(message);
    await this.ordersService.complete(
      message.order_id,
      message.status === PaymentStatus.APPROVED
        ? OrderStatus.PAYED
        : OrderStatus.CANCELED,
    );
  }
}
