import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import { store as reduxStore } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { defaultToastConfig } from './utils/animations';

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
