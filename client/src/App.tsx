import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

type Props = {};

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

      // 404
      {
        path: '*',
        element: <NotFound />,
        errorElement: errorElement,
      },
    ],
  },
]);

const App = (props: Props) => {
  return <RouterProvider router={browserRouter} />;
};

export default App;
