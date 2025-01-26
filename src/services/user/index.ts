import { useContext } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from 'contexts/AuthContext';
import { CustomQueryOptions, IChallenge, IMetric, IUser } from 'types';

import * as api from './requests';
import { IUpdateUserDto } from './types';

export const useRefreshMe = () => {
    const queryClient = useQueryClient();

    return {
        refresh: () => queryClient.invalidateQueries({
            queryKey: ['cached', 'me'],
        }),
    }
};

export function useMe(options?: CustomQueryOptions<IUser>) {
    const enabled = options?.enabled || false;

    return useQuery<IUser>({
        enabled,
        staleTime: Infinity,
        queryKey: ['cached', 'me', enabled],
        queryFn: async () => {
            const response = await api.getMe();

            return response;
        },
    })
}

export function useUsers() {
    return useQuery<IUser[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.getUsers();

            return response;
        },
    })
}

export function useUpdateUser() {
    return useMutation({
        mutationFn: async (userPayload: IUpdateUserDto) => {
            const response = await api.updateUser(userPayload);

            return response;
        },
    })
}

export function useUserChallenges(
    options?: CustomQueryOptions<IChallenge[]>,
) {
    const { user } = useContext(AuthContext);

    return useQuery<IChallenge[]>({
        ...options,
        queryKey: ['userChallenges', user],
        queryFn: async () => {
            const response = await api.getUserChallenges(user?.id);

            return response;
        },
    });
};

export function useUserMetrics() {
    const { user } = useContext(AuthContext);

    return useQuery<IMetric>({
        enabled: !!user?.id,
        queryKey: ['cached', 'userMetrics', user],
        queryFn: async () => {
            const response = await api.getUserMetrics(user?.id);

            return response;
        },
    });
}