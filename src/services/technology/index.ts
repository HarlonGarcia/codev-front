import { useQuery } from '@tanstack/react-query';
import { CustomQueryOptions } from '@types';

import * as api from './requests';

export function useTechnologies(options?: CustomQueryOptions<ITechnology[]>) {
  return useQuery<ITechnology[]>({
    ...options,
    queryKey: ['technologies'],
    queryFn: async () => {
      const data = await api.getTechnologies();

      return data;
    },
  })
}