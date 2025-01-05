import { useContext } from 'react';
import { toast } from 'react-toastify';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from 'contexts/AuthContext';
import i18next from 'i18next';
import { CustomQueryOptions, IChallenge, IUser } from 'types';

import * as api from './requests';
import { ICreateChallengeDto, IGetChallengeParams } from './types';

const useRefresh = () => {
    const queryClient = useQueryClient();
    const keys = ['challengeUsers', 'userChallenges'];

    return () => queryClient.invalidateQueries({
        predicate({ queryKey }) {
            return keys.some((key) => queryKey.includes(key))
        },
    });
};

export function useChallenges(
    filters?: IGetChallengeParams,
    options?: CustomQueryOptions<IChallenge[]>,
) {
    return useQuery<IChallenge[]>({
        staleTime: Infinity,
        ...options,
        queryKey: ['challenges', filters],
        queryFn: async () => {
            const response = await api.getChallenges(filters);

            return response;
        },
    });
};

export function useChallenge(challengeId?: string) {
    return useQuery<IChallenge>({
        enabled: !!challengeId,
        queryKey: ['challenges', challengeId],
        queryFn: async () => {
            const response = await api.getChallenge(challengeId);

            return response;
        },
    });
};

export function useParticipants(challengeId?: string) {
    return useQuery<IUser[]>({
        enabled: !!challengeId,
        queryKey: ['challengeUsers', challengeId],
        queryFn: async () => {
            const response = await api.getParticipants(challengeId);

            return response;
        },
    });
};

export function useJoinChallenge() {
    const refresh = useRefresh();
    const { user } = useContext(AuthContext);

    return useMutation({
        mutationFn: async (challengeId: string) => {
            const response = await api.joinChallenge({
                challengeId,
                userId: user?.id,
            });

            return response;
        },
        onSuccess: refresh,
    });
};

export function useUnjoinChallenge() {
    const refresh = useRefresh();
    const { user } = useContext(AuthContext);

    return useMutation({
        mutationFn: async (challengeId: string) => {
            const response = await api.unjoinChallenge({
                challengeId,
                userId: user?.id,
            });

            return response;
        },
        onSuccess: refresh,
    });
};

export function useCreateChallenge() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (challenge: ICreateChallengeDto) => {
            if (!challenge.authorId) {
                toast(i18next.t('pages.create_challenge.fields.author.error'));
                return;
            }

            const response = await api.createChallenge(challenge);

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: ({ queryKey }) => {
                    const keysToInvalidate = ['challenges', 'userMetrics'];

                    return keysToInvalidate.some((key) => queryKey.includes(key));
                }
            });
        },
    });
};

export function useDeleteChallenge() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (challengeId: string) => {
            const response = await api.deleteChallenge(challengeId);

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: ({ queryKey }) => {
                    const keysToInvalidate = ['challenges', 'userMetrics'];

                    return keysToInvalidate.some((key) => queryKey.includes(key));
                }
            });
        },
    });
};