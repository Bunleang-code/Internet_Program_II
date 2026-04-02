import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  // imports: [forwardRef(() => OrdersModule) ],
  imports: [CoreModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
