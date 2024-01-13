import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/reduxHooks';
import { ReactNode } from 'react';
import SignIn from '../pages/auth/Login';

type LayoutProps = {
  children: ReactNode;
};

const RequireAuth: React.FC<LayoutProps> = ({ children }) => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  // if (!user?.user_id) {
  //   navigate('/sign-in');
  //   return <SignIn />;
  // }

  return <div>{children}</div>;
};

export default RequireAuth;
