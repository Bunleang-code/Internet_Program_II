import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [OrdersModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
