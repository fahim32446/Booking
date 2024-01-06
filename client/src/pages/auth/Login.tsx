import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api';
import { useEffect } from 'react';
import { displayErrorMessage } from '../../utils/ErrorToast';
import { toast } from 'react-toastify';
import { VscLoading } from 'react-icons/vsc';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [postLogin, { isLoading, isError, isSuccess, error }] =
    useLoginMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const onSubmit = handleSubmit((data) => {
    postLogin(data);
  });

  useEffect(() => {
    if (isError) {
      displayErrorMessage(error);
    } else if (isSuccess) {
      navigate(location.state?.from?.pathname || '/');
      toast.success('Login successful');
    }
  }, [isError, isSuccess]);

  return (
    <form className='flex flex-col gap-5 p-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Sign In</h2>
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
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Not Registered?{' '}
          <Link className='underline' to='/register'>
            Create an account here
          </Link>
        </span>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
        >
          <div className='flex gap-3 justify-center items-center'>
            Login
            <span className='animate-spin'>{isLoading && <VscLoading />}</span>
          </div>
        </button>
      </span>
    </form>
  );
};

export default SignIn;
