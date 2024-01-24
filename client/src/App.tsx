import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Registration from './pages/auth/Registration';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth';
import SignIn from './pages/auth/Login';
import AddHotel from './pages/hotel/page/AddHotel';
import EditHotel from './pages/hotel/page/EditHotel';
import MyHotels from './pages/hotel/page/MyHotels';
import BookingHotels from './pages/search/pages/BookingHotels';
import HotelDetails from './pages/search/pages/HotelDetails';
import Search from './pages/search/pages/Search';
import MyBookings from './pages/search/pages/myBooking';
import { api, useCheckUserQuery, useLazySignOutQuery } from './redux/api';
import { useAppDispatch } from './redux/reduxHooks';
import { logout } from './redux/slice/user_slice';
import { persistor } from './redux/store/store';
import { useEffect } from 'react';

const errorElement = <ErrorPage />;

const browserRouter = createBrowserRouter([
  {
    element: (
      // <RequireAuth>
      <Layout />
      // </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Registration />,
      },

      {
        path: '/sign-in',
        element: <SignIn />,
      },

      {
        path: '/search',
        element: <Search />,
      },

      {
        path: '/details/:id',
        element: <HotelDetails />,
      },

      // 404
      {
        path: '*',
        element: <NotFound />,
        errorElement: errorElement,
      },
    ],
  },

  // Auth Route

  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      {
        path: '/add-hotel',
        element: <AddHotel />,
      },

      {
        path: '/my-hotels',
        element: <MyHotels />,
      },

      {
        path: `/edit-hotel/:hotelId`,
        element: <EditHotel />,
      },

      {
        path: `/hotel/:hotelId/booking`,
        element: <BookingHotels />,
      },

      {
        path: '/my-bookings',
        element: <MyBookings />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useAppDispatch();

  const { isError } = useCheckUserQuery();
  const [signOut] = useLazySignOutQuery();

  const logOut = () => {
    dispatch(api.util.resetApiState());
    dispatch(logout());
    persistor.flush();
    signOut();
  };

  useEffect(() => {
    if (isError) {
      logOut();
    }
  }, []);

  // if (isError) {
  //   logOut();
  // }

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
