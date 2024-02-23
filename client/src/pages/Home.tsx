import { Link } from 'react-router-dom';
import { HotelType } from './hotel/utils/hotelType';
import { useSearchHotelQuery } from './search/api/searchEndpoints';
import Loading from '../components/Loading';

const Home = () => {
  const { data, isLoading } = useSearchHotelQuery({ page: 1 });

  const hotels = data?.data;

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2, 5) || [];
  if (isLoading) return <Loading />;
  return (
    <div className='space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className='grid gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {topRowHotels.map((hotel, key) => (
            <LatestDestinationCard hotel={hotel} key={key} />
          ))}
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
          {bottomRowHotels.map((hotel, key) => (
            <LatestDestinationCard hotel={hotel} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

export const LatestDestinationCard = ({ hotel }: { hotel: HotelType }) => {
  const image =
    hotel?.imageUrls && Array.isArray(hotel?.imageUrls)
      ? hotel?.imageUrls
      : JSON.parse(String(hotel?.imageUrls));

  return (
    <Link
      to={`/details/${hotel.hotelId}`}
      className='relative cursor-pointer overflow-hidden rounded-md'
    >
      <div className='h-[300px]'>
        <img
          src={image[0]}
          className='w-full h-full object-cover object-center'
        />
      </div>

      <div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'>
        <span className='text-white font-bold tracking-tight text-3xl'>
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};
