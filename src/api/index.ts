import { toast } from 'react-toastify';

import axios from 'axios';
import { t } from 'i18next';

import { store } from '../store';

export const api = axios.create();

api.interceptors.request.use((request) => {
  const token = store.getState().auth.token;

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response ?? {};
    const isDuplicatedKey = data?.message.includes('duplicate key');

    const customMessage = t([ `global.api.${status}`, 'global.api.default' ]);

    if (isDuplicatedKey) {
      toast.error(t('global.api.duplicate'));
    }

    if (!isDuplicatedKey) {
      toast.error(customMessage);
    }

    return Promise.reject(error);
  });