import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Receipt } from './database/entities/receipts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from './receipts/receipts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ← loads .env first

    TypeOrmModule.forRootAsync({               // ← waits for .env
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Receipt],
        synchronize: true,
      }),
    }),

    ReceiptModule,

    NotificationsModule,

    OrdersModule,

    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
