import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Receipt } from './database/entities/receipts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from './receipts/receipts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { Category } from './database/entities/categories.entity';
import { Product } from './database/entities/products.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';

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
        entities: [Receipt, Category, Product],
        synchronize: true,
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // ✅ We will switch between schema-first and code-first later
      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')], // schema-first
      // autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'), // code-first (later)

      // playground: true,
    }),

    ReceiptModule,

    NotificationsModule,

    OrdersModule,

    CoreModule,

    CategoriesModule,

    ProductsModule,

    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
