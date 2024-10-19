import { ToastContainer } from 'react-toastify';

import dayjs from 'dayjs';

import { AuthProvider } from './contexts/AuthContext';
import { GlobalProvider } from './contexts/GlobalContext';
import Routes from './routes';
import { defaultToastConfig } from './utils/animations';

import "dayjs/locale/en";
import "dayjs/locale/pt-br";
import 'react-toastify/dist/ReactToastify.css';

dayjs.locale('pt-br');

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ToastContainer {...defaultToastConfig} />
        <Routes />
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
