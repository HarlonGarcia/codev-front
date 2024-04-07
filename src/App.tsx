import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { Provider } from 'react-redux';
import { ToastContainer, ToastOptions } from 'react-toastify';

import Routes from './routes';
import { store as reduxStore } from './store';

import 'react-toastify/dist/ReactToastify.css';

const defaultToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 1000 * 4,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

const authStore = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {
  return (
    <AuthProvider store={authStore}>
      <Provider store={reduxStore}>
        <ToastContainer {...defaultToastConfig} />
        <Routes />
      </Provider>
    </AuthProvider>
  );
}

export default App;
