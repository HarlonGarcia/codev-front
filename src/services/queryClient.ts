import { QueryClient } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME, GARBAGE_COLLECTION_INTERVAL } from 'utils/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      gcTime: GARBAGE_COLLECTION_INTERVAL,
      refetchOnWindowFocus: false,
    },
  },
});

