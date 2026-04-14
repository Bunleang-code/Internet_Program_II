import { Module } from '@nestjs/common';
import { EVENT_PUBLISHER } from './tokens';

@Module({
  providers: [
    {
      provide: 'll',
      useValue: {
        publish: (event: string, payload: any) => {
          console.log(`[CORE EVENT] ${event}`, payload);
            // Forward to CoreModule / centralized event publisher
            // this.publisher.publish(event, payload);
        },
      },
    },
  ],
  exports: ['ll'],
})
export class CoreModule {}