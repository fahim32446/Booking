import { Request } from 'express';
import AbstractServices from '../../../abstract/abstract.service';

export class bookingService extends AbstractServices {
  public async getBookingList(req: Request) {
    return await this.models.db.transaction(async (trx) => {
      const booking_conn = this.models.BookingModal(req);

      const userId = req.userId;

      const res = await booking_conn.getBookingList(userId);

      return {
        success: true,
        data: res,
        message: 'Hotel booking is successfully done',
      };
    });
  }
}
