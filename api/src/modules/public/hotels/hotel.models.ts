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
    type,
    facilities,
    sort_by,
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
          builder.where('city', 'like', `%${city.trim()}%`);
        }
        if (name) {
          builder.where('name', 'like', `%${name.trim()}%`);
        }

        if (adult_count) {
          builder.whereRaw('adult_count >= ?', [Number(adult_count)]);
        }

        if (child_count) {
          builder.where('child_count', 'like', `%${child_count}%`);
        }

        if (country) {
          builder.where('country', 'like', `%${country.trim()}%`);
        }

        if (price_per_night) {
          builder.whereRaw('price_per_night <= ?', [Number(price_per_night)]);
        }

        if (star_rating && star_rating.length > 0) {
          builder.whereIn('star_rating', [star_rating]);
        }

        if (type) {
          builder.whereIn('type', [type.trim()]);
        }
        if (facilities) {
          const facilitiesArray = facilities.split(',');

          builder.where((innerBuilder) => {
            innerBuilder.where('facilities', 'like', `%${facilitiesArray[0]}%`);
            for (let i = 1; i < facilitiesArray.length; i++) {
              innerBuilder.orWhere(
                'facilities',
                'like',
                `%${facilitiesArray[i]}%`
              );
            }
          });
          // builder.where('facilities', 'like', `%${facilities}%`);
        }
      })
      .orderBy('price_per_night', sort_by)
      .offset(skip)
      .limit(10);

    const count = await this.query()
      .count('* as total')
      .from('hotels')
      .where((builder) => {
        if (city) {
          builder.where('city', 'like', `%${city.trim()}%`);
        }
        if (name) {
          builder.where('name', 'like', `%${name.trim()}%`);
        }

        if (adult_count) {
          builder.whereRaw('adult_count >= ?', [Number(adult_count)]);
        }

        if (child_count) {
          builder.where('child_count', 'like', `%${child_count}%`);
        }

        if (country) {
          builder.where('country', 'like', `%${country.trim()}%`);
        }

        if (price_per_night) {
          builder.whereRaw('price_per_night <= ?', [Number(price_per_night)]);
        }

        if (star_rating && star_rating.length > 0) {
          builder.whereIn('star_rating', [star_rating]);
        }

        if (type) {
          builder.whereIn('type', [type.trim()]);
        }
        if (facilities) {
          const facilitiesArray = facilities.split(',');

          builder.where((innerBuilder) => {
            innerBuilder.where('facilities', 'like', `%${facilitiesArray[0]}%`);
            for (let i = 1; i < facilitiesArray.length; i++) {
              innerBuilder.orWhere(
                'facilities',
                'like',
                `%${facilitiesArray[i]}%`
              );
            }
          });
          // builder.where('facilities', 'like', `%${facilities}%`);
        }
      })
      .first();
    return { result, count: count.total } as { result: any; count: number };
  }

  async HotelCount() {
    const [result] = await this.query().count('* as total').from('hotels');
    return result;
  }

  async hotelDetails(id: string | number) {
    const [result] = await this.query()
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
      .where('hotel_id', id);

    return result;
  }
}

export default HotelModel;
