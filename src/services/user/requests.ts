import { api } from '../../api';
import { getUrl } from '../utils';

export const getMe = async () => {
  const { data } = await api.get(getUrl('me'));

  return data ?? {};
}

export const getUsers = async () => {
  const { data } = await api.get(getUrl('users'));

  return data ?? [];
}
