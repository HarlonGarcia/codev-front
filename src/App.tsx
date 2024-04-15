import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import { persistor, store as reduxStore } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { defaultToastConfig } from './utils/animations';
import { AUTH_KEY } from './utils/constants';

const authStore = createStore({
  authName: AUTH_KEY,
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider store={authStore}>
          <ToastContainer {...defaultToastConfig} />
          <Routes />
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
