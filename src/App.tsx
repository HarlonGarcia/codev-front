import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Preloader } from 'components/Preloader';
import { Loader } from 'components/shared/Loader';
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
    const [showPreloader, setShowPreloader] = useState(true)

    useEffect(function showPreload() {
        const timeout = setTimeout(() => {
            setShowPreloader(false)
        }, 3400);

        return () => clearTimeout(timeout);
    }, [])

    return (
        <BrowserRouter>
            <AuthProvider>
                <GlobalProvider>
                    <ToastContainer {...defaultToastConfig} />
                    <Loader />
                    {showPreloader ?
                        <Preloader />
                        : <Routes />
                    }
                </GlobalProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
