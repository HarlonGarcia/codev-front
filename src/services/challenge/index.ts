import { useContext } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from 'contexts/AuthContext';
import { CustomQueryOptions, IChallenge, IUser } from 'types';

import * as api from './requests';
import { ICreateChallengeDto, IGetChallengeParams } from './types';

export function useChallenges(
  filters?: IGetChallengeParams,
  options?: CustomQueryOptions<IChallenge[]>,
) {
  return useQuery<IChallenge[]>({
    staleTime: Infinity,
    ...options,
    queryKey: ['challenges', filters],
    queryFn: async () => {
      const response = await api.getChallenges(filters);

      return response;
    },
  });
};

export function useChallenge(challengeId?: string) {
  return useQuery<IChallenge>({
    enabled: !!challengeId,
    queryKey: ['challenges', challengeId],
    queryFn: async () => {
      const response = await api.getChallenge(challengeId);

      return response;
    },
  });
};

export function useParticipants(challengeId?: string) {
  return useQuery<IUser[]>({
    enabled: !!challengeId,
    queryKey: ['challenges', 'users', challengeId],
    queryFn: async () => {
      const response = await api.getParticipants(challengeId);

      return response;
    },
  });
};

export function useJoinChallenge() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: async (challengeId: string) => {
      const response = await api.joinChallenge({
        challengeId,
        userId: user?.id,
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['challenges', 'users'],
      })
    },
  });
};

export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (challenge: ICreateChallengeDto) => {
      const response = await api.createChallenge(challenge);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['challenges'],
      });
    },
  });
};