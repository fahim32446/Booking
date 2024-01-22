import { Request, Response } from 'express';
import AbstractController from '../../../abstract/abstract.controllers';
import { bookingService } from './booking.service';

export class bookingController extends AbstractController {
  private bookingService = new bookingService();

  constructor() {
    super();
  }

  public getBookingList = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.bookingService.getBookingList(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('error');
      }
    }
  );
}
