import { api } from 'api';
import axios from 'axios';

import { generateUrl, toBase64 } from '../utils';
import { ICreateChallengeDto, IGetChallengeParams, IJoinChallengeDto } from './types';

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
  const { data } = await api.get(
    generateUrl('challenges', { identifier: challengeId })
  );

  return data ?? {};
}

export const getParticipants = async (challengeId?: string) => {
  const { data } = await api.get(
    generateUrl('challenge_users', { challengeId })
  );

  return data ?? [];
}

export const joinChallenge = async ({ userId, challengeId }: IJoinChallengeDto) => {
  if (!challengeId || !userId) {
    throw new Error('The user or challenge is not valid.');
  }

  const response = await api.post(
    generateUrl('challenge_users', { challengeId }),
    null,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
    },
  );


  return response.data;
}

export const createChallenge = async ({
  image,
  ...challenge
}: ICreateChallengeDto) => {
  const fileBase64 = await toBase64(image);

  const { data } = await api.post(
    generateUrl('challenges'), {
      ...challenge,
      image: {
        file: fileBase64,
        fileName: image.name,
      },
    },
  );

  return data ?? {};
}