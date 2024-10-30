import { Body, Controller, Post } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  async createOrder(@Body() order: OrderDTO) {
    return this.orderService.createOrder(order);
  }
}
