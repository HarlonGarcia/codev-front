/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { api } from 'api';
import { InternalAxiosRequestConfig } from 'axios';
import { useLogin, useRefreshToken, useSignUp } from 'services/auth';
import { useMe } from 'services/user';
import { ILoginPayload, IUser } from 'types';
import { ADMIN } from 'utils/constants';

interface AuthContextProps {
    token: string | null;
    user?: IUser;
    error: boolean;
    isAdmin: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    isUserLoading: boolean;
    isRefreshTokenLoading: boolean;
    signUp: (data: IUser, callback?: () => void) => void;
    login: (data: ILoginPayload, callback?: () => void) => void;
    logout: () => void;
}

type CustomAxiosRequestConfig = InternalAxiosRequestConfig<any> & { _retry?: boolean };

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.pathname || '/';

    const [token, setToken] = useState<string | null>(null);

    const {
        mutate: refreshToken,
        reset: clearRefreshTokenState, 
        isPending: isRefreshTokenLoading,
        error: refreshTokenError,
    } = useRefreshToken();

    const {
        refetch: getMe,
        data: user,
        isFetching: isUserLoading,
    } = useMe();

    const {
        mutate: login,
        isPending: isLoggingIn,
        error: loginError,
    } = useLogin();

    const {
        mutate: signUp,
        isPending: isSigningIn,
        error: signupError,
    } = useSignUp();

    const logout = () => setToken(null);

    const getAuthMutationOptions = (callback?: () => void) => ({
        onSuccess: (token: string) => {
            setToken(token);
            callback?.();
            clearRefreshTokenState();
        },
    });

    const handleSignUp = (user: IUser, callback?: () => void) => {
        signUp(user, getAuthMutationOptions(callback));
    }

    const handleLogin = (data: ILoginPayload, callback?: () => void) => {
        login(data, getAuthMutationOptions(callback));
    };

    useEffect(function getLoggedUserData() {
        if (!token) {
            return;
        }

        getMe();
    }, [token]);

    useLayoutEffect(function setAccessToken() {
        const interceptor = api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
            const hasToken = !config._retry && token;

            config.headers.Authorization =
                hasToken
                    ? `Bearer ${token}`
                    : config.headers.Authorization;

            return config;
        });

        return () => api.interceptors.request.eject(interceptor);
    }, [token]);

    useLayoutEffect(function callRefreshToken() {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const request = error.config as CustomAxiosRequestConfig;

                if (error.status === 401 || error.message === 'Unauthorized') {
                    refreshToken(undefined, {
                        onSuccess: (data) => {
                            setToken(data.token);

                            request.headers.Authorization = `Bearer ${data.token}`;
                            request._retry = true;

                            navigate(from, { replace: true });

                            return api(request);
                        },
                        onError: logout,
                    });
                }

                return Promise.reject(error);
            });

        return () => api.interceptors.response.eject(interceptor);
    }, []);

    const isAuthenticated = Boolean(user) && !refreshTokenError && !!token;
    const isAdmin = isAuthenticated && Boolean(user?.roles?.some(({ name }) => ADMIN === name));

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                error: !!loginError || !!signupError,
                isLoading: isLoggingIn || isSigningIn,
                isUserLoading,
                isRefreshTokenLoading,
                isAdmin,
                isAuthenticated,
                signUp: handleSignUp,
                login: handleLogin,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
