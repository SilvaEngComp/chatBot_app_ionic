import './styles.scss';

import { Person } from '@mui/icons-material';
import { Button } from '@mui/material';
import Header from 'components/Header';
import Menu from 'components/Menu';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeAuthOnLocalStorage, setAuthOnLocalStorage } from 'services';

import { useAuthContext } from '../../contexts/AuthContext/hook';
interface AdminTemplateProps {
  children?: React.ReactNode;
}

interface StateInterface {
  message: {
    type: 'error' | 'info' | 'success';
    text: string;
  };
}

export default function AdminTemplate({ children }: AdminTemplateProps) {
  const { clean, user } = useAuthContext();
  const navigate = useNavigate();
  const state = useLocation().state as StateInterface;
  const path = useLocation().pathname;
  const message = state?.message;

  useEffect(() => {
    if (message) {
      toast[message.type](message.text);
      history.replaceState({ message: null }, '');
    }
  }, []);

  return (
    <div className="app">
      <Header>
        <Button
          id="profile-edit"
          startIcon={<Person />}
          type="button"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => {
            if (path !== '/dashboard/users/edit' && path !== '/dashboard/users/create') {
              navigate('/dashboard/users/edit', {
                state: user,
              });
            }
          }}
        >
          {user?.name}
        </Button>
        <Link to="/" target="_blank">
          <Button
            id="chat-button"
            type="button"
            variant="contained"
            color="secondary"
            disableElevation
          >
            Chat
          </Button>
        </Link>
        <Button
          id="logout-button"
          type="button"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => {
            removeAuthOnLocalStorage();
            clean();
            navigate('/login', { replace: true });
          }}
        >
          Sair
        </Button>
      </Header>
      <div id="admin-container" className="d-flex">
        <Menu />
        <main id="admin-content">{children}</main>
      </div>
    </div>
  );
}
