import { useQuery } from '@tanstack/react-query';
import * as api from './requests';

export function useTechnologies() {
  return useQuery({
    queryKey: ['technologies'],
    queryFn: async () => {
      const response = await api.getTechnologies();

      return response;
    },
  })
}