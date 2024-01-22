import AbstractRouter from '../../../abstract/abstract.routers';
import { userController } from './user.controller';

class userRoute extends AbstractRouter {
  private userController = new userController();
  
  constructor() {
    super();
    this.initRouters();
  }

  initRouters() {
    this.routers.get('/check-user', this.userController.checkUser);

    this.routers.post(
      '/booking-payment/:hotelId',
      this.userController.bookingPayment
    );

    this.routers.post(
      '/booking-confirm/:hotelId',
      this.userController.bookingConfirm
    );
  }
}

export default userRoute;
