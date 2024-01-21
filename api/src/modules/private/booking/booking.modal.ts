import AbstractModels from '../../../abstract/abstract.models';
import { ICreateBooking } from './booking.type';

export class BookingModal extends AbstractModels {
  async bookHotel(data: ICreateBooking) {
    const [res] = await this.query().insert(data).into('bookings');

    return res;
  }
}
