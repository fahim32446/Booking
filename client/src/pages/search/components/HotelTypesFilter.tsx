import React from 'react';
import { hotelTypes } from '../../hotel/utils/hotelOptionCategories';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { saveSearchValues } from '../../../redux/slice/search_slice';

const HotelTypesFilter = () => {
  const search = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prevType = search?.type || [];

    let updatedValue: string[] = [...prevType];

    if (updatedValue?.includes(value)) {
      updatedValue = updatedValue?.filter((type) => type !== value);
    } else {
      updatedValue.push(value);
    }

    dispatch(saveSearchValues({ ...search, type: updatedValue }));
  };

  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Hotel Type</h4>
      {hotelTypes.map((hotelType, index) => (
        <label key={index} className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={hotelType}
            checked={search?.type?.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
