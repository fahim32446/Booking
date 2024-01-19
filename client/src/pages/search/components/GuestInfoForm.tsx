import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { saveSearchValues } from '../../../redux/slice/search_slice';

type Props = {
  hotelId?: string;
  pricePerNight?: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const isLoggedIn = useAppSelector((state) => state.user.user?.user_id);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    dispatch(
      saveSearchValues({
        ...search,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adultCount: data.adultCount,
        childCount: data.childCount,
      })
    );

    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    dispatch(
      saveSearchValues({
        ...search,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adultCount: data.adultCount,
        childCount: data.childCount,
      })
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className='flex flex-col p-4 bg-blue-200 gap-4'>
      <h3 className='text-md font-bold'>£{pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className='grid grid-cols-1 gap-4 items-center'>
          <div>
            <DatePicker
              required
              selected={new Date(checkIn)}
              onChange={(date) => setValue('checkIn', date as Date)}
              selectsStart
              startDate={new Date(checkIn)}
              endDate={new Date(checkOut)}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText='Check-in Date'
              className='min-w-full bg-white p-2 focus:outline-none'
              wrapperClassName='min-w-full'
            />
          </div>
          <div>
            <DatePicker
              required
              selected={new Date(checkOut)}
              onChange={(date) => setValue('checkOut', date as Date)}
              selectsStart
              startDate={new Date(checkIn)}
              endDate={new Date(checkOut)}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText='Check-in Date'
              className='min-w-full bg-white p-2 focus:outline-none'
              wrapperClassName='min-w-full'
            />
          </div>
          <div className='flex bg-white px-2 py-1 gap-2'>
            <label className='items-center flex'>
              Adults:
              <input
                className='w-full p-1 focus:outline-none font-bold'
                type='number'
                min={1}
                max={20}
                {...register('adultCount', {
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'There must be at least one adult',
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className='items-center flex'>
              Children:
              <input
                className='w-full p-1 focus:outline-none font-bold'
                type='number'
                min={0}
                max={20}
                {...register('childCount', {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className='text-red-500 font-semibold text-sm'>
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl'>
              Book Now
            </button>
          ) : (
            <button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl'>
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
