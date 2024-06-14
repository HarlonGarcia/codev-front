import { useQuery } from '@tanstack/react-query';
import * as api from './requests';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.getUsers();

      return response;
    },
  })
}