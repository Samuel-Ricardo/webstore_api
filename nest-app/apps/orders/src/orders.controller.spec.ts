import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        ClientsModule.register([
          {
            name: 'ORDERS_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'orders',
                brokers: ['kafka:29092'],
              },
            },
          },
        ]),
      ],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ordersController.getHello()).toBe('Hello World!');
    });
  });
});
