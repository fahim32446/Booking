import AbstractRouter from '../../../abstract/abstract.routers';
import hotelController from './hotel.controller';

class hotel extends AbstractRouter {
  private controller = new hotelController();

  constructor() {
    super();
    this.initRouters();
  }

  initRouters() {
    this.routers.get('/search', this.controller.searchHotel);
  }
}
export default hotel;
