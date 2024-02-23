import { useEffect } from 'react';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import {
  useDeleteMySingleHotelMutation,
  useGetMyHotelsQuery,
} from '../api/hotelEndpoint';

const MyHotels = () => {
  const { data, isLoading } = useGetMyHotelsQuery();

  const [deleteHotel, { isSuccess, isLoading: deleteLoading }] =
    useDeleteMySingleHotelMutation();

  const hotelData = data?.data;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Hotel Deleted');
    }
  }, [isSuccess, deleteLoading]);

  if (isLoading) return <Loading />;

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <Link
          to='/add-hotel'
          className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'
        >
          Add Hotel
        </Link>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {hotelData?.map((hotel, index) => {
          const imgURL = hotel.image_urls && JSON.parse(hotel.image_urls);

          return (
            <div
              key={index}
              className='flex flex-col md:flex-row justify-between border border-slate-300 rounded-lg p-2 gap-5'
            >
              <div className='w-72 flex-1'>
                <img className='rounded' src={imgURL[0]} alt='hotel-image' />
              </div>

              <div
                data-testid='hotel-card'
                className='flex flex-col justify-between gap-5 flex-[3]'
              >
                <div className='flex justify-between items-center'>
                  <h2 className='text-2xl font-bold'>{hotel.name}</h2>

                  <div className='flex gap-2'>
                    <button className='flex justify-end'>
                      <Link
                        to={`/edit-hotel/${hotel.hotel_id}`}
                        className='flex bg-blue-600 text-white font-bold p-1 hover:bg-blue-500'
                      >
                        View Details
                      </Link>
                    </button>

                    <button
                      disabled={deleteLoading}
                      onClick={() => deleteHotel({ id: hotel.hotel_id })}
                      className='bg-red-600 text-white font-bold p-1 hover:bg-red-500'
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className='whitespace-pre-line line-clamp-1'>
                  {hotel.description}
                </div>
                <div className='grid grid-cols-5 gap-2'>
                  <div className='border border-slate-300 rounded-sm p-1.5 flex items-center truncate'>
                    <BsMap className='mr-1' />
                    {hotel.city}
                  </div>
                  <div className='border border-slate-300 rounded-sm p-1.5 flex items-center'>
                    <BsBuilding className='mr-1' />
                    {hotel.type}
                  </div>
                  <div className='border border-slate-300 rounded-sm p-1.5 flex items-center'>
                    <BiMoney className='mr-1' />£{hotel.price_per_night} per
                    night
                  </div>
                  <div className='border border-slate-300 rounded-sm p-1.5 flex items-center'>
                    <BiHotel className='mr-1' />
                    {hotel.adult_count} adults, {hotel.child_count} children
                  </div>
                  <div className='border border-slate-300 rounded-sm p-1.5 flex items-center'>
                    <BiStar className='mr-1' />
                    {hotel.star_rating} Star Rating
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyHotels;
