import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/AuthContext';
import { GlobalProvider } from './contexts/GlobalContext';
import Routes from './routes';
import { defaultToastConfig } from './utils/animations';

import './styles/alt.scss'
import 'react-toastify/dist/ReactToastify.css';

// globalStyles();

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
