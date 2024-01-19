import AbstractRouter from '../../../abstract/abstract.routers';
import HotelController from './my_hotel.controller';
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
    this.routers.post(
      '/',
      upload.array('imageFiles', 6),
      this.hotelController.addHotel
    );
    this.routers.get('/', this.hotelController.getHotels);
    this.routers.get('/:id', this.hotelController.getSingleHotel);
    this.routers.put(
      '/:id',
      upload.array('imageFiles', 6),
      this.hotelController.updateHotel
    );
  }
}
export default HotelRoute;
