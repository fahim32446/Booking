import { Application } from 'express';
import HotelRoute from '../modules/private/my_hotels/my_hotel.route';

const private_routes = (app: Application) => {
  //HOTEL private_routes
  app.use('/api/v1/my-hotel', new HotelRoute().routers);
};

export default private_routes;
