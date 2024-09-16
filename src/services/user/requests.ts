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
