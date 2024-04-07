import axios from 'axios';

export const api = axios.create();

api.interceptors.request.use((request) => {
  const _credentials = localStorage.getItem('_credentials');

  if (_credentials) {
    const token = JSON.parse(_credentials);

    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});