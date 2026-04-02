import { forwardRef, Module } from '@nestjs/common';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'ORDERS_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                    urls: [configService.get('RABBITMQ_URL')],
                    queue: 'orders_queue',
                    queueOptions: { durable: true },
                    },
                }),
            },
                
        ]),
        
        forwardRef(() => NotificationsModule),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}
