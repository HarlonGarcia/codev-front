import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import { store as reduxStore } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { defaultToastConfig } from './utils/animations';

const authStore = createStore({
  authName: 'codev_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <AuthProvider store={authStore}>
        <ToastContainer {...defaultToastConfig} />
        <Routes />
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;
