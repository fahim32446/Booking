import AbstractModels from '../../abstract/abstract.models';
import { HotelData } from './hotel.type';

class HotelModel extends AbstractModels {
  async addHotel(data: HotelData) {
    const [result] = await this.query().insert(data).into('hotels');

    return result;
  }

  async getHotels(id: string | number) {
    const result = await this.query()
      .select('*')
      .from('hotels')
      .where({ user_id: id })
      .orderBy('last_updated', 'desc');

    return result;
  }

  async getSingleHotel(id: string | number) {
    const [result] = await this.query()
      .select(
        'hotel_id as hotelId',
        'user_id as userId',
        'name',
        'city',
        'country',
        'description',
        'type',
        'facilities',
        'adult_count as adultCount',
        'child_count as childCount',
        'price_per_night as pricePerNight',
        'star_rating as starRating',
        'image_urls as imageUrls',
        'last_updated as lastUpdated'
      )
      .from('hotels')
      .where({ hotel_id: id });

    return result;
  }
}

export default HotelModel;
