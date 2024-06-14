import { useQuery } from '@tanstack/react-query';
import * as api from './requests';

export function useCategories() {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await api.getCategories();

      return response;
    },
});
};