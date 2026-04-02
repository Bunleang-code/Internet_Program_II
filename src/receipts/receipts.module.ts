import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReceiptsController } from "./receipts.controller";
import { ReceiptsService } from "./receipts.service";
import { Receipt } from "src/database/entities/receipts.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApikeyGuard } from "src/common/guards/api-key.guard";
import { NotificationsModule } from "src/notifications/notifications.module";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";


@Module({
    imports: [
        TypeOrmModule.forFeature([Receipt]),

        ClientsModule.registerAsync([
        {
            name: 'RABBITMQ_SERVICE',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: Transport.RMQ,
                options: {
                urls: [configService.get('RABBITMQ_URL')],
                queue: 'receipts_queue',
                queueOptions: { durable: true },
                },
            }),
        },
        ]),  
       
        NotificationsModule,
    ],
    providers: [ReceiptsService],
    controllers: [ReceiptsController]
})
export class ReceiptModule {}