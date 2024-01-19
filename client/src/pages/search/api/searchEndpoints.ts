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
          type: arg.type,
          facilities: arg.facilities,
          price_per_night: arg.price_per_night,
          sort_by: arg.sort_by,
        },
      }),
    }),

    getHotelDetails: build.query<HttpResponse<HotelType>, string>({
      query: (arg) => ({
        url: `/hotel/details/${arg}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazySearchHotelQuery, useGetHotelDetailsQuery } =
  searchEndpoints;
