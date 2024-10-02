import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { useLogin, useSignUp } from 'services/auth';
import { useMe } from 'services/user';
import { ILoginPayload, IUser } from 'types';

interface AuthContextProps {
  user?: IUser,
  error: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: IUser, callback?: () => void ) => void;
  login: (data: ILoginPayload, callback?: () => void) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
  
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: user, refetch: refetchUser } = useMe();

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

  useEffect(function setToken() {
    const token = localStorage.getItem('@auth');

    if (token) {
      setIsAuthenticated(true);
      return;
    }

    logout();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error: !!loginError || !!signupError,
        isAuthenticated: Boolean(user) && isAuthenticated,
        isLoading: isLoggingIn || isSigningIn,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
