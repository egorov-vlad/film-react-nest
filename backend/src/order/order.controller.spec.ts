import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  const ticket = {
    film: '1',
    session: '1',
    daytime: '2024-12-01',
    row: 1,
    seat: 1,
    price: 100,
  };
  const order = {
    email: 'test@test.ru',
    phone: '+79999999999',
    tickets: [ticket],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockReturnValue({
          total: 1,
          items: [ticket],
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be create order', async () => {
    const result = await controller.createOrder(order);
    expect(service.createOrder).toHaveBeenCalledWith(order);
    expect(result).toEqual({
      total: 1,
      items: [ticket],
    });
  });
});
