import { Inject, Injectable } from '@nestjs/common';
// import { EVENT_PUBLISHER } from 'src/core/tokens';

type EventPublisher = { publish: (event: string, payload: any) => void };
@Injectable()
export class NotificationsService {
    constructor(
        @Inject('ll')
        private readonly publisher: EventPublisher
    ) {}
    // constructor(private readonly orderservice: OrdersService){}
    notify(event: string, payload: any) {
        // console.log(`[NOTIFY] ${event}`, payload);
        this.publisher.publish(event, payload);
        return {ok: true};
    }
}
