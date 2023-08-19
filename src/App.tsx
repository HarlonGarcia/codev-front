import { AuthProvider } from 'react-auth-kit';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, ToastOptions } from 'react-toastify';
import Routes from './routes';
import { store } from './store';

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

function App() {
  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure
    >
      <Provider store={store} >
        <ToastContainer 
          {...defaultToastConfig}
        />
        <Routes />
      </Provider>
    </AuthProvider>
  );
}

export default App;
