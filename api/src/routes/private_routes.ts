import { Application } from 'express';
import HotelRoute from '../modules/private/my_hotels/my_hotel.route';
import userRoute from '../modules/private/user/user.route';
import { bookingRoute } from '../modules/private/booking/booking.route';

const private_routes = (app: Application) => {
  app.use('/api/v1/my-hotel', new HotelRoute().routers);
  app.use('/api/v1/user', new userRoute().routers);
  app.use('/api/v1/booking', new bookingRoute().routers);
};

export default private_routes;
