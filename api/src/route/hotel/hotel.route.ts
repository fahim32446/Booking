import AbstractRouter from '../../abstract/abstract.routers';
import HotelController from './hotel.controller';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

class HotelRoute extends AbstractRouter {
  private hotelController = new HotelController();

  constructor() {
    super();
    this.initRouters();
  }
  initRouters() {
    this.routers
      .post('/', upload.array('imageFiles', 6), this.hotelController.addHotel)
      .post('/sign-google', this.hotelController.signGoogle)
      .post('/sign-up', this.hotelController.signUp)
      .post('/forgot-password', this.hotelController.forgotPassword)
      .post('/verify-otp', this.hotelController.verifyOTP)
      .post('/reset-password', this.hotelController.resetPassword);

    this.routers.get('/verify-token', this.hotelController.signOut);
    this.routers.get('/sign-out', this.hotelController.signOut);
  }
}
export default HotelRoute;
