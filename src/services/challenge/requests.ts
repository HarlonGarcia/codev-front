import { api } from 'api';
import axios from 'axios';

import { generateUrl } from '../utils';
import { ICreateChallengeDto, IGetChallengeParams } from './types';

export const getChallenges = async (filters?: IGetChallengeParams) => {
  const { page = 0, size = 100, orderBy = 'LATEST' } = filters ?? {};

  const { data } = await axios.get(generateUrl('challenges'), {
    params: {
      page,
      size,
      orderBy: orderBy ?? undefined,
    },
  });

  return data ?? [];
}

export const getChallenge = async (challengeId?: string) => {
  const { data } = await api.get(generateUrl('challenges', { challengeId }));

  return data ?? {};
}

export const joinChallenge = async (challengeId: string) => {
  const userId = '';

  if (!challengeId || !userId) {
    throw new Error('The user or challenge is not valid.');
  }

  const configParams = {
    headers: {
      'x-user-id': userId,
    },
  };

  const { data } = await api.post(
    generateUrl('join_challenge', { challengeId }),
    undefined,
    configParams,
  );

  return data;
}

export const createChallenge = async (challenge: ICreateChallengeDto) => {
  const { data } = await api.post(generateUrl('challenges'), challenge);

  return data ?? {};
}