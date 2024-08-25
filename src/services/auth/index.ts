import { useMutation } from '@tanstack/react-query';
import { ILoginPayload, IUser } from '@types';

import * as api from './requests';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: ILoginPayload) => {
      const response = await api.login(payload);

      return response;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (payload: IUser) => {
      const response = await api.signUp(payload);

      return response;
    },
  });
};