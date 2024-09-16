import { api } from 'api';

import { generateUrl } from '../utils';

export const getCategories = async () => {
  const { data } = await api.get(generateUrl('categories'));

  return data ?? [];
};
