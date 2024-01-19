import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { saveSearchValues } from '../../../redux/slice/search_slice';

const PriceFilter = () => {
  const search = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const onChange = (e: any) => {
    const value = e;
    dispatch(saveSearchValues({ ...search, price: value }));
  };

  return (
    <div>
      <h4 className='text-md font-semibold mb-2'> Max Price</h4>
      <select
        className='p-2 border rounded-md w-full'
        value={search?.price ? Number(search?.price) : undefined}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value=''>Select Max Price</option>
        {[50, 100, 200, 300, 500, 700, 900, 1200].map((price, index) => (
          <option key={index} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
