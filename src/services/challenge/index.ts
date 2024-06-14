import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomQueryOptions } from '@types';

import * as api from './requests';
import { ICreateChallengeDto, IGetChallengeParams } from './types';

export function useChallenges(
  filters?: IGetChallengeParams,
  options?: CustomQueryOptions<IChallenge[]>,
) {
  return useQuery<IChallenge[]>({
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
    queryKey: ['challenge', challengeId],
    queryFn: async () => {
      const response = await api.getChallenge(challengeId);

      return response;
    },
  });
};

export function useJoinChallenge() {
  return useMutation({
    mutationKey: ['joinChallenge'],
    mutationFn: async (challengeId: string) => {
      const response = await api.joinChallenge(challengeId);

      return response;
    },
  });
};

export function useCreateChallenge() {
  return useMutation({
    mutationKey: ['createChallenge'],
    mutationFn: async (challenge: ICreateChallengeDto) => {
      const response = await api.createChallenge(challenge);

      return response;
    },
  });
};