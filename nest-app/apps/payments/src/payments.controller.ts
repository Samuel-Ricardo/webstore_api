import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('hello2')
  getHello(): string {
    return this.paymentsService.getHello();
  }

  @Get()
  all() {
    return this.paymentsService.all();
  }
}
