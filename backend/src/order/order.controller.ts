import { Body, Controller, Post } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { IOrderResponse, OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: OrderDTO): Promise<IOrderResponse> {
    return this.orderService.createOrder(order);
  }
}
