import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/reduxHooks';
import { useLazySearchHotelQuery } from '../api/searchEndpoints';
import StarRatingFilter from '../components/StarRatingFilter';
import SearchResultsCard from '../components/SearchResultsCard';

type Props = {};

const Search = (props: Props) => {
  const search = useAppSelector((state) => state.search);

  const [getSearch, { isLoading, isError, data }] = useLazySearchHotelQuery();

  useEffect(() => {
    getSearch({
      city: search.destination,
      adult_count: search.adultCount,
      child_count: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      page: 1,
      star_rating: search.stars,
    });
  }, [search]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
            Filter by:
          </h3>
          <StarRatingFilter
          // selectedStars={selectedStars}
          // onChange={handleStarsChange}
          />
          {/* <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          /> */}
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold'>
            {data?.count} Hotels found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          {/* <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className='p-2 border rounded-md'
          >
            <option value=''>Sort By</option>
            <option value='starRating'>Star Rating</option>
            <option value='pricePerNightAsc'>
              Price Per Night (low to high)
            </option>
            <option value='pricePerNightDesc'>
              Price Per Night (high to low)
            </option>
          </select> */}
        </div>
        {data?.data?.map((hotel, index) => (
          <SearchResultsCard hotel={hotel} key={index} />
        ))}
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
