import { Container, Header, Space } from '@mantine/core';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { setUser } from '../../../authentication/authentication.slice';
import { useAppDispatch } from '../../../store/hooks';
import { useGetProfileQuery } from '../../../store/services/api.service';
import { CoreMenu } from './components/CoreMenu';

const cookie = new Cookies();

const CoreContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (!data && !isLoading) {
      // Delete cookie if profile couldn't be fetched
      // Occurs when connect.auth exists, but connect.sid does not
      cookie.remove('connect.auth', { path: '/', sameSite: 'strict' });
      navigate('/login');
    }

    if (data) {
      dispatch(setUser(data));
    }
  }, [data, isLoading]);

  return (
    <>
      <Header height={50}>
        <CoreMenu />
      </Header>
      <Container size={'xl'}>
        <Space h={16} />
        <Outlet />
      </Container>
    </>
  );
};

export default CoreContainer;
