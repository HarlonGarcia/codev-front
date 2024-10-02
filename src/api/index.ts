import { toast } from 'react-toastify';

import axios from 'axios';
import { t } from 'i18next';

export const api = axios.create();

api.interceptors.request.use((request) => {
  const token = localStorage.getItem('@auth');
  
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response ?? {};
    const isDuplicatedKey = data?.message.includes('duplicate key');

    const customMessage = t([
      `global.alerts.errors.${status}`,
      'global.alerts.errors.default',
    ]);

    if (isDuplicatedKey) {
      toast.error(t('global.alerts.errors.duplicated_key'));
    }

    if (!isDuplicatedKey) {
      toast.error(customMessage);
    }

    return Promise.reject(error);
  },
);