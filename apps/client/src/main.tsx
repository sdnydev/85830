import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <HelmetProvider>
          <Helmet titleTemplate="%s | FishFry Tours" />
          <MantineProvider>
            <ModalsProvider>
              <NotificationsProvider position="top-right">
                <App />
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </HelmetProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
