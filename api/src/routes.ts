import { Application } from 'express';
import HotelRoute from './route/hotel/hotel.route';

const routes = (app: Application) => {
  //HOTEL ROUTES
  app.use('/api/v1/hotel', new HotelRoute().routers);
};

export default routes;
