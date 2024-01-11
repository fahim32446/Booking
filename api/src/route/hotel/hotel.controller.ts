import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controllers';
import HotelService from './hotel.service';
import HotelValidator from './hotel.validator';

class HotelController extends AbstractController {
  private hotelService = new HotelService();
  private validator = new HotelValidator();

  constructor() {
    super();
  }

  public addHotel = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.hotelService.addHotel(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Creating new hotels error');
      }
    }
  );
}

export default HotelController;
