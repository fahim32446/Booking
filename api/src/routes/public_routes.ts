import { Application } from 'express';

import AuthRoute from '../modules/public/auth/auth.route';
import hotel from '../modules/public/hotels/hotel.route';

const public_routes = (app: Application) => {
  app.use('/api/v1/auth', new AuthRoute().routers);
  app.use('/api/v1/hotel', new hotel().routers);
};

export default public_routes;
