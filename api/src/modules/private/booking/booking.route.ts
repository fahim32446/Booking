import AbstractRouter from '../../../abstract/abstract.routers';
import { bookingController } from './booking.controller';

export class bookingRoute extends AbstractRouter {
  private bookingController = new bookingController();

  constructor() {
    super();
    this.initRouters();
  }

  initRouters() {
    this.routers.get(
      '/get-booking-list',
      this.bookingController.getBookingList
    );
  }
}
