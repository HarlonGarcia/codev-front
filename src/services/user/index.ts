import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from 'contexts/AuthContext';
import { IChallenge, IUser } from 'types';

import * as api from './requests';

export function useMe() {
  return useQuery<IUser>({
    enabled: false,
    staleTime: Infinity,
    queryKey: ['cached', 'me'],
    queryFn: async () => {
      const response = await api.getMe();

      return response;
    },
  })
}

export function useUsers() {
  return useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.getUsers();

      return response;
    },
  })
}

export function useUserChallenges() {
  const { user } = useContext(AuthContext);

  return useQuery<IChallenge[]>({
    queryKey: ['userChallenges', user],
    queryFn: async () => {
      const response = await api.getUserChallenges(user?.id);

      return response;
    },
  });
};