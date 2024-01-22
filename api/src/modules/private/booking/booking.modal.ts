import AbstractModels from '../../../abstract/abstract.models';
import { ICreateBooking } from './booking.type';

export class BookingModal extends AbstractModels {
  async bookHotel(data: ICreateBooking) {
    const [res] = await this.query().insert(data).into('bookings');

    return res;
  }

  async getBookingList(userId: string | number) {
    const [res] = await this.query()
      .select(
        'check_in',
        'check_out',
        'total_cost',
        'bookings.hotel_id',
        'email',
        'first_name',
        'name as hotelName',
        'city',
        'country',
        'description',
        'type',
        'price_per_night',
        'star_rating',
        'image_urls'
      )
      .from('bookings')
      .where({ 'bookings.user_id': userId })
      .leftJoin('users as user', 'bookings.user_id', 'user.user_id')
      .leftJoin('hotels as hotel', 'bookings.hotel_id', 'hotel.hotel_id');

    return res;
  }
}
