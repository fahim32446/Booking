import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { VscLoading } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegistrationMutation } from '../../redux/api';
import { useAppDispatch } from '../../redux/reduxHooks';
import { setUser } from '../../redux/slice/user_slice';
import { displayErrorMessage } from '../../utils/ErrorToast';

export type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [postData, { isError, isLoading, isSuccess, error, data }] =
    useRegistrationMutation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    postData(data);
  });

  useEffect(() => {
    if (isError) {
      displayErrorMessage(error);
    } else if (isSuccess) {
      dispatch(setUser(data?.data || null));
      toast.success('Registration successful!');
      navigate(location.state?.from?.pathname || '/');
    }
  }, [isError, isSuccess]);

  return (
    <form className='flex flex-col gap-5 p-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('first_name', { required: 'This field is required' })}
          ></input>
          {errors.first_name && (
            <span className='text-red-500'>{errors.first_name.message}</span>
          )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('last_name', { required: 'This field is required' })}
          ></input>
          {errors.last_name && (
            <span className='text-red-500'>{errors.last_name.message}</span>
          )}
        </label>
      </div>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('email', { required: 'This field is required' })}
        ></input>
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        ></input>
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required';
              } else if (watch('password') !== val) {
                return 'Your passwords do no match';
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          disabled={isLoading}
          type='submit'
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
        >
          <div className='flex gap-3 justify-center items-center'>
            Create Account
            <span className='animate-spin'>{isLoading && <VscLoading />}</span>
          </div>
        </button>
      </span>
    </form>
  );
};

export default Registration;
