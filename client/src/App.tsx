import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Registration from './pages/auth/Registration';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/auth/Login';
import RequireAuth from './components/RequireAuth';
import AddHotel from './pages/hotel/page/AddHotel';

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
    ],
  },
]);

const App = () => {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
