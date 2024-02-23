import { api } from '../../../redux/api';
import { HttpResponse } from '../../../utils/commonTypes';
import { hotel } from '../../../utils/tags';
import { HotelType, getHotels } from '../utils/hotelType';

export const hotelEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    addMyHotel: build.mutation<HttpResponse<void>, { data: FormData }>({
      query: ({ data }) => ({
        url: `/my-hotel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [hotel],
    }),

    getMyHotels: build.query<HttpResponse<getHotels[]>, void>({
      query: () => ({
        url: `/my-hotel`,
        method: 'GET',
      }),
      providesTags: () => [hotel],
    }),

    getMySingleHotel: build.query<HttpResponse<HotelType>, { id: string }>({
      query: ({ id }) => ({
        url: `/my-hotel/${id}`,
        method: 'GET',
      }),
      providesTags: () => [hotel],
    }),

    deleteMySingleHotel: build.mutation<
      HttpResponse<HotelType>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/my-hotel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [hotel],
    }),

    updateHotel: build.mutation<
      HttpResponse<HotelType>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/my-hotel/${id}`,
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
  useDeleteMySingleHotelMutation,
} = hotelEndpoint;
