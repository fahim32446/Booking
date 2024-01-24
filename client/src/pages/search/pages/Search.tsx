import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/reduxHooks';
import { useLazySearchHotelQuery } from '../api/searchEndpoints';
import FacilitiesFilter from '../components/FacilitiesFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import PriceFilter from '../components/PriceFilter';
import SearchResultsCard from '../components/SearchResultsCard';
import StarRatingFilter from '../components/StarRatingFilter';
import Loading from '../../../components/Loading';

const Search = () => {
  const search = useAppSelector((state) => state.search);
  const [sortOption, setSortOption] = useState<string>('');

  const [getSearch, { data, isLoading, isFetching }] =
    useLazySearchHotelQuery();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getSearch({
      city: search.destination,
      adult_count: search.adultCount,
      child_count: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      page: 1,
      star_rating: search.stars,
      type: search.type,
      facilities: search.facility,
      price_per_night: search.price,
      sort_by: sortOption,
    });
  }, [search, sortOption]);

  // if (isLoading || isFetching) return <Loading />;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
            Filter by:
          </h3>

          <StarRatingFilter />
          <HotelTypesFilter />
          <FacilitiesFilter />
          <PriceFilter />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold'>
            {data?.count} Hotels found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className='p-2 border rounded-md'
          >
            <option value=''>Sort By</option>
            <option value='asc'>Price Per Night (low to high)</option>
            <option value='desc'>Price Per Night (high to low)</option>
          </select>
        </div>
        {isLoading || isFetching ? (
          <Loading />
        ) : (
          data?.data?.map((hotel, index) => (
            <SearchResultsCard hotel={hotel} key={index} />
          ))
        )}
        <div>
          {/* <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
