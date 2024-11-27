import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { useLogin, useSignUp } from 'services/auth';
import { useMe } from 'services/user';
import { ILoginPayload, IUser } from 'types';
import { ADMIN } from 'utils/constants';

interface AuthContextProps {
  user?: IUser,
  invalidateUser: (options?: RefetchOptions) => Promise<QueryObserverResult<IUser, Error>>;
  isUserLoading: boolean;
  error: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: IUser, callback?: () => void ) => void;
  login: (data: ILoginPayload, callback?: () => void) => void;
  logout: () => void;
  changeLanguage: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
  
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {
        data: user,
        refetch: refetchUser,
        isFetching: isUserLoading,
    } = useMe();

    const {
        mutate: sendLogin,
        isPending: isLoggingIn,
        error: loginError,
    } = useLogin();

    const {
        mutate: register,
        isPending: isSigningIn,
        error: signupError,
    } = useSignUp();

    const handleUserAuthentication = (token: string) => {
        localStorage.setItem('@auth', token);
        setIsAuthenticated(true);
        refetchUser();
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('@auth');
    };

    const signUp = (user: IUser, callback?: () => void) => {
        register(user, {
            onSuccess: (token) => {
                handleUserAuthentication(token);
                callback?.();
            },
            onError: logout,
        });
    }

    const login = (data: ILoginPayload, callback?: () => void) => {
        sendLogin(data, {
            onSuccess: (token) => {
                handleUserAuthentication(token);
                callback?.();
            },
            onError: logout,
        });
    };

    const handleLanguageChange = (value: string) => {
        dayjs.locale(value);
        i18next.changeLanguage(value);
    };

    const changeLanguage = () => {
        const currentLanguage = i18next.resolvedLanguage;
    
        if ('en' === currentLanguage) {
            handleLanguageChange('pt-BR');
            return;
        }

        handleLanguageChange('en');
    };

    useEffect(function setToken() {
        const token = localStorage.getItem('@auth');

        if (token) {
            setIsAuthenticated(true);
            return;
        }

        logout();
    }, []);

    const isAdmin = user && user.roles?.some(({ name }) => ADMIN === name);

    return (
        <AuthContext.Provider
            value={{
                user,
                invalidateUser: refetchUser,
                isUserLoading,
                error: !!loginError || !!signupError,
                isAuthenticated: Boolean(user) && isAuthenticated,
                isAdmin: Boolean(user) && isAuthenticated && Boolean(isAdmin),
                isLoading: isLoggingIn || isSigningIn,
                signUp,
                login,
                logout,
                changeLanguage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
