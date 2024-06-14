import { ILoginPayload, IUser } from '@types';
import axios from 'axios';

import { generateUrl } from '../utils';

export const login = async (payload: ILoginPayload) => {
  const { data, status } = await axios.post(generateUrl('login'), payload);

  if (status === 200) {
    return data.token;
  }

  return undefined;
};

export const signUp = async (payload: IUser) => {
  const { data, status } = await axios.post(generateUrl('signup'), payload);

  if (status === 201) {
    return data.token;
  }

  return undefined;
}