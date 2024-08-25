import { createContext, PropsWithChildren, useState } from 'react';

import { useLogin, useSignUp } from '@services/auth';
import { CustomMutationOptions, ILoginPayload, IUser } from '@types';

interface AuthContextProps {
  user: ILoginPayload | null,
  error: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: IUser, options: CustomMutationOptions<IUser> ) => void;
  login: (data: ILoginPayload, options: CustomMutationOptions<ILoginPayload>) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
  
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<ILoginPayload | null>(null);

  const {
    mutate: sendLogin,
    isPending: isLoggingIn,
  } = useLogin();

  const {
    mutate: register,
    isPending: isSigningIn,
  } = useSignUp();

  const signUp = (
    data: IUser,
    options: CustomMutationOptions<IUser> = {},
  ) => {
    const payload = {
      email: data.email,
      password: '',
    };

    register(data, {
      ...options,
      onSuccess: () => setUser(payload),
      onError: () => setUser(null),
    });
  }

  const login = (
    data: ILoginPayload,
    options: CustomMutationOptions<ILoginPayload> = {},
  ) => {
    sendLogin(data, {
      ...options,
      onSuccess: () => setUser(data),
      onError: () => setUser(null),
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error: false,
        isAuthenticated: !!user,
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
