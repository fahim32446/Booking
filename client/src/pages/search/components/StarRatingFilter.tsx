import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { saveSearchValues } from '../../../redux/slice/search_slice';

const StarRatingFilter = () => {
  const search = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prevStar = search?.stars;

    let updatedValue: string[] = [...prevStar];

    if (updatedValue?.includes(value)) {
      updatedValue = updatedValue?.filter((star) => star !== value);
    } else {
      updatedValue.push(value);
    }

    dispatch(saveSearchValues({ ...search, stars: updatedValue }));
  };

  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Property Rating</h4>
      {['5', '4', '3', '2', '1'].map((star, index) => (
        <label key={index} className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={star}
            checked={search?.stars?.includes(star)}
            onChange={(e) => onChange(e)}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
