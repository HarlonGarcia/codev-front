import { useQuery } from '@tanstack/react-query';
import { IUser } from 'types';

import * as api from './requests';

export function useMe() {
  return useQuery<IUser>({
    enabled: false,
    queryKey: ['me'],
    queryFn: async () => {
      const response = await api.getMe();

      return response;
    },

  })
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.getUsers();

      return response;
    },
  })
}