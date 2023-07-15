import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './order.dto';

@Controller()
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
}
