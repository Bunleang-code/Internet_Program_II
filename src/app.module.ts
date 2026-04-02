import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Receipt } from './database/entities/receipts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from './receipts/receipts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

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

    ClientsModule.registerAsync([ //   async = waits for ConfigService to load .env first
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule], //  make ConfigModule available inside useFactory
        inject: [ConfigService], //  inject ConfigService into useFactory function
        useFactory: (configService: ConfigService) => ({ //  receives ConfigService as argument
          transport: Transport.RMQ,   //  use RabbitMQ transport protocol
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'receipts_queue',
            queueOptions: { durable: true },     //  queue survives RabbitMQ restart
          },
        }),
      },
    ]),

    ReceiptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
