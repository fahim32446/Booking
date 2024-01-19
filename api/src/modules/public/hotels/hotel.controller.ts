import { Request, Response } from 'express';
import AbstractController from '../../../abstract/abstract.controllers';
import hotelService from './hotel.service';
import HotelValidator from './hotel.validator';

class hotelController extends AbstractController {
  private hotelService = new hotelService();
  private validator = new HotelValidator();
  constructor() {
    super();
  }

  public searchHotel = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.hotelService.searchHotel(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('error');
      }
    }
  );
}

export default hotelController;
