import { QueryClient } from '@tanstack/react-query';
import { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import { get, set, del } from 'idb-keyval';
import { DEFAULT_STALE_TIME, GARBAGE_COLLECTION_INTERVAL } from 'utils/constants';

export const createIDBPersister = (key: IDBValidKey = 'codev-idb') => {
    return {
        persistClient: async (client: PersistedClient) => {
            const newClient: PersistedClient = {
                ...client,
                clientState: {
                    mutations: [],
                    queries: client.clientState.queries.filter((query) => query.queryKey.includes('cached')),
                },
            };

            await set(key, newClient);
        },
        restoreClient: async () => {
            return await get<PersistedClient>(key);
        },
        removeClient: async () => {
            await del(key);
        },
    } as Persister;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: DEFAULT_STALE_TIME,
            gcTime: GARBAGE_COLLECTION_INTERVAL,
            refetchOnWindowFocus: false,
            retry: 3,
        },
    },
});

