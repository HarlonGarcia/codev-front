import { api } from 'api';

import { generateUrl } from '../utils';

export const getMe = async () => {
  const { data } = await api.get(generateUrl('me'));

  return data ?? {};
}

export const getUsers = async () => {
  const { data } = await api.get(generateUrl('users'));

  return data ?? [];
}

export const getUserChallenges = async (userId?: string) => {
  if (!userId) {
    throw new Error('The user or challenge is not valid.');
  }

  const { data } = await api.get(
    generateUrl('user_challenges'),
    {
      headers: {
        'X-User-ID': userId,
      },
    },
  );
  return data ?? [];
}
