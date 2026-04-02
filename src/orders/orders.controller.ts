import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApikeyGuard } from 'src/common/guards/api-key.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@UseGuards(ApikeyGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderservice: OrdersService){}

    @Post()
    create(@Body() dto: any){
        return this.orderservice.createOrder(dto);
    }
}
