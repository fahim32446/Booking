import { Request, Response } from 'express';
import AbstractController from '../../../abstract/abstract.controllers';
import HotelService from './my_hotel.service';
import HotelValidator from './my_hotel.validator';

class HotelController extends AbstractController {
  private hotelService = new HotelService();
  private validator = new HotelValidator();

  constructor() {
    super();
  }

  public addHotel = this.assyncWrapper.wrap(
    this.validator.addHotel,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.addHotel(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Creating new hotels error');
      }
    }
  );

  public getHotels = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.hotelService.getHotels(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('error');
      }
    }
  );

  public getSingleHotel = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.hotelService.getSingleHotel(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('error');
      }
    }
  );

  public updateHotel = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.hotelService.updateHotel(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('error');
      }
    }
  );
}

export default HotelController;
