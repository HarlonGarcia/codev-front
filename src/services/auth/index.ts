import { useMutation } from '@tanstack/react-query';
import { ILoginParams, ISignUpParams } from './types';
import * as api from './requests';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: ILoginParams) => {
      const response = await api.login(payload);

      return response;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (payload: ISignUpParams) => {
      const response = await api.signUp(payload);

      return response;
    },
  });
};