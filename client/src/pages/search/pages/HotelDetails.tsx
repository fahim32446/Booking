import { useParams } from 'react-router-dom';
import { useGetHotelDetailsQuery } from '../api/searchEndpoints';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../components/GuestInfoForm';

const HotelDetails = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetHotelDetailsQuery(id!);

  const hotel = data?.data;

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel?.starRating || 0 }).map((_, index) => (
            <AiFillStar key={index} className='fill-yellow-400' />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel?.name}</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel?.imageUrls.map((image, index) => (
          <div key={index} className='h-[300px]'>
            <img
              src={image}
              alt={hotel?.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel?.facilities &&
          hotel?.facilities.map((facility, index) => (
            <div key={index} className='border border-slate-300 rounded-sm p-3'>
              {facility}
            </div>
          ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel?.description}</div>
        <div className='h-fit'>
          <GuestInfoForm
            pricePerNight={hotel?.pricePerNight}
            hotelId={hotel?.hotelId}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
