import AbstractModels from '../../../abstract/abstract.models';
import { IHotelSearchType } from './hotel.type';

class HotelModel extends AbstractModels {
  async searchHotel({
    skip,
    name,
    city,
    star_rating,
    adult_count,
    child_count,
    country,
    price_per_night,
  }: IHotelSearchType & { skip: number }) {
    const result = await this.query()
      .select(
        'hotel_id as hotelId',
        'name',
        'city',
        'country',
        'description',
        'type',
        'adult_count as adultCount',
        'child_count as childCount',
        'price_per_night as pricePerNight',
        'star_rating as starRating',
        'facilities',
        'image_urls as imageUrls',
        'last_updated'
      )
      .from('hotels')
      .where((builder) => {
        if (city) {
          builder.where('city', 'like', `%${city}%`);
        }
        if (name) {
          builder.where('name', 'like', `%${name}%`);
        }

        if (star_rating) {
          builder.where('star_rating', 'like', `%${star_rating}%`);
        }

        if (adult_count) {
          builder.where('adult_count', 'like', `%${adult_count}%`);
        }

        if (child_count) {
          builder.where('child_count', 'like', `%${child_count}%`);
        }

        if (country) {
          builder.where('country', 'like', `%${country}%`);
        }

        if (price_per_night) {
          builder.where('price_per_night', 'like', `%${price_per_night}%`);
        }
      })
      .offset(skip)
      .limit(10);

    const count = await this.query()
      .count('* as total')
      .from('hotels')
      .where((builder) => {
        if (city) {
          builder.where('city', 'like', `%${city}%`);
        }
        if (name) {
          builder.where('name', 'like', `%${name}%`);
        }
        if (star_rating) {
          builder.where('star_rating', 'like', `%${star_rating}%`);
        }
        if (adult_count) {
          builder.where('adult_count', 'like', `%${adult_count}%`);
        }
        if (child_count) {
          builder.where('child_count', 'like', `%${child_count}%`);
        }
        if (country) {
          builder.where('country', 'like', `%${country}%`);
        }
        if (price_per_night) {
          builder.where('price_per_night', 'like', `%${price_per_night}%`);
        }
      })
      .first();
    return { result, count: count.total } as { result: any; count: number };
  }

  async HotelCount() {
    const [result] = await this.query().count('* as total').from('hotels');

    return result;
  }
}

export default HotelModel;
