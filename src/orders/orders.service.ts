import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDERS_SERVICE')
        private readonly client: ClientProxy,
        // @Inject(forwardRef(() => NotificationsService))
        private readonly notifications: NotificationsService,
    ){}

    createOrder(orderDTO: any){
        this.client.emit('order_created', {
            order: orderDTO,
            createdAt: new Date().toISOString()
        });

        this.notifications.notify('order_created', {
            order: orderDTO
        });

        return { status: 'Order accepted', order: orderDTO};
    }
}
