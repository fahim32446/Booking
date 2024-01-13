import { Link } from 'react-router-dom';
import { api, useLazySignOutQuery } from '../redux/api';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { logout } from '../redux/slice/user_slice';
import { persistor } from '../redux/store/store';
// import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [signOut, { isSuccess }] = useLazySignOutQuery();

  const handleClick = () => {
    dispatch(api.util.resetApiState());
    dispatch(logout());
    persistor.flush();
    signOut();
  };

  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>MernHolidays.com</Link>
        </span>
        <span className='flex space-x-2'>
          {user?.user_id ? (
            <>
              <Link
                className='flex items-center text-white px-3 font-bold hover:bg-blue-600'
                to='/my-bookings'
              >
                My Bookings
              </Link>
              <Link
                className='flex items-center text-white px-3 font-bold hover:bg-blue-600'
                to='/my-hotels'
              >
                My Hotels
              </Link>
              <button
                onClick={handleClick}
                className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 '
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to='/sign-in'
              className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100'
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
