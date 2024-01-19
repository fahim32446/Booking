import { api } from '../../../redux/api';
import { HttpResponse } from '../../../utils/commonTypes';
import { HotelType } from '../../hotel/utils/hotelType';
import { IHotelSearchType } from '../utils/SearchPageType';

export const searchEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    searchHotel: build.query<HttpResponse<HotelType[]>, IHotelSearchType>({
      query: (arg) => ({
        url: `/hotel/search`,
        method: 'GET',
        params: {
          city: arg.city,
          adult_count: arg.adult_count,
          child_count: arg.child_count,
          checkIn: arg.checkIn,
          checkOut: arg.checkOut,
          page: arg.page || 1,
          star_rating: arg.star_rating,
        },
      }),
    }),
  }),
});

export const { useLazySearchHotelQuery } = searchEndpoints;
