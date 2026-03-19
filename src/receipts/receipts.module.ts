import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReceiptsController } from "./receipts.controller";
import { ReceiptsService } from "./receipts.service";
import { Receipt } from "src/database/entities/receipts.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";


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
],
    providers: [ReceiptsService],
    controllers: [ReceiptsController]
})
export class ReceiptModule {}