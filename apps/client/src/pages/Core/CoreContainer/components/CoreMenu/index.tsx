import { MenuOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, Container, Group, Menu, Text } from '@mantine/core';
import { MouseEventHandler } from 'react';
import { logout } from '../../../../../authentication/authentication.slice';
import { User } from '../../../../../authentication/dtos/user.dto';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { useLogoutMutation } from '../../../../../store/services/api.service';

interface MenuButtonProps {
  handleLogout: MouseEventHandler<HTMLButtonElement>;
  user: User | null;
}

export const CoreMenu = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authentication.user);

  const [apiLogout] = useLogoutMutation();

  const handleLogout = async () => {
    await apiLogout();
    dispatch(logout());
  };

  return (
    <Container
      size={'xl'}
      style={{ display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}
    >
      <div>
        <Text weight={700} style={{ fontVariant: 'small-caps' }}>
          FishFry Tours
        </Text>
      </div>

      <Group>
        <Menu
          control={
            <Button variant="subtle" leftIcon={<MenuOutlined style={{ fontSize: '18px', lineHeight: '16px' }} />}>
              Menu
            </Button>
          }
        >
          <Menu.Label>{user ? `Hi ${user.name}!` : ''}</Menu.Label>
          <Menu.Item icon={<PoweroffOutlined style={{ fontSize: '16px' }} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Group>
    </Container>
  );
};
