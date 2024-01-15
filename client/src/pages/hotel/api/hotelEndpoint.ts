import { api } from '../../../redux/api';
import { HttpResponse } from '../../../utils/commonTypes';
import { hotel } from '../../../utils/tags';
import { HotelType, getHotels } from '../utils/hotelType';

export const hotelEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    addMyHotel: build.mutation<HttpResponse<void>, { data: FormData }>({
      query: ({ data }) => ({
        url: `/hotel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [hotel],
    }),

    getMyHotels: build.query<HttpResponse<getHotels[]>, void>({
      query: () => ({
        url: `/hotel`,
        method: 'GET',
      }),
      providesTags: () => [hotel],
    }),

    getMySingleHotel: build.query<HttpResponse<HotelType>, { id: string }>({
      query: ({ id }) => ({
        url: `/hotel/${id}`,
        method: 'GET',
      }),
      providesTags: () => [hotel],
    }),

    updateHotel: build.mutation<
      HttpResponse<HotelType>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/hotel/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: () => [hotel],
    }),
  }),
});

export const {
  useAddMyHotelMutation,
  useGetMyHotelsQuery,
  useGetMySingleHotelQuery,
  useUpdateHotelMutation,
} = hotelEndpoint;
