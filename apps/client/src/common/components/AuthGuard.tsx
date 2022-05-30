import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { setUser } from '../../authentication/authentication.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
interface Props {
  children: JSX.Element;
  redirectTo: string;
}

const cookie = new Cookies();

const AuthGuard = ({ children, redirectTo }: Props) => {
  const dispatch = useAppDispatch();
  const [userDispatched, setUserDispatched] = useState<boolean>(false);

  const cookieSet = cookie.get('connect.auth');
  if (cookieSet) {
    if (!userDispatched) {
      dispatch(setUser({ id: '', email: '', name: '' }));
      setUserDispatched(true);
    }
  }

  const isAuthenticated = useAppSelector(state => state.authentication.user) == null ? false : true;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default AuthGuard;
