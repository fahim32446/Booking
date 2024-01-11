import { api } from '../../../redux/api';
import { HttpResponse } from '../../../utils/commonTypes';
import { hotel } from '../../../utils/tags';

export const hotelEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    addHotel: build.mutation<HttpResponse<any[]>, { data: FormData }>({
      query: ({ data }) => ({
        url: `/hotel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [hotel],
    }),
  }),
});

export const { useAddHotelMutation } = hotelEndpoint;
