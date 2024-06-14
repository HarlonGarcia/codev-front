import { api } from '@api';

import { generateUrl } from '../utils';

export const getTechnologies = async () => {
  const response = await api.get(generateUrl('technologies'));

  return response.data ?? [];
}