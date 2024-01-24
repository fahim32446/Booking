import { useGetMyBookingQuery } from '../api/searchEndpoints';

const MyBookings = () => {
  const { data } = useGetMyBookingQuery();

  const hotels = data?.data;

  return (
    <div className='space-y-5'>
      <h1 className='text-3xl font-bold'>My Bookings</h1>
      {hotels?.map((hotel, key) => {
        const image =
          hotel?.image_urls && Array.isArray(hotel?.image_urls)
            ? hotel?.image_urls
            : JSON.parse(String(hotel?.image_urls));

        return (
          <div
            key={key}
            className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'
          >
            <div className='lg:w-full lg:h-[250px]'>
              <img
                src={image[0]}
                className='w-full h-full object-cover object-center'
              />
            </div>
            <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
              <div className='text-2xl font-bold'>
                {hotel.hotelName}
                <div className='text-xs font-normal'>
                  {hotel.city}, {hotel.country}
                </div>
              </div>

              <div>
                <div>
                  <span className='font-bold mr-2'>Dates: </span>
                  <span>
                    {new Date(hotel.check_in).toDateString()} -
                    {new Date(hotel.check_out).toDateString()}
                  </span>
                </div>
                <div>
                  <span className='font-bold mr-2'>Guests:</span>
                  <span>
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
