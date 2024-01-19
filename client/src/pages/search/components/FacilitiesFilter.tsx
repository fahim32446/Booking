import React from 'react';
import { hotelFacilities } from '../../hotel/utils/hotelOptionCategories';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { saveSearchValues } from '../../../redux/slice/search_slice';

const FacilitiesFilter = () => {
  const search = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prevFacility = search?.facility || [];

    let updatedValue: string[] = [...prevFacility];

    if (updatedValue?.includes(value)) {
      updatedValue = updatedValue?.filter((type) => type !== value);
    } else {
      updatedValue.push(value);
    }

    dispatch(saveSearchValues({ ...search, facility: updatedValue }));
  };

  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Facilities</h4>
      {hotelFacilities.map((facility, index) => (
        <label key={index} className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={facility}
            checked={search?.facility?.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
