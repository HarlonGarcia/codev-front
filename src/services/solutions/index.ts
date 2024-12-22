import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ISolution } from 'types/solution';

import * as api from './requests';
import { ICreateSolutionDto } from './types';

export const useInvalidateSolutions = () => {
    const queryClient = useQueryClient();

    return {
        invalidate: () => queryClient.invalidateQueries({
            queryKey: ['solutions'],
        }),
    };
};

export function useSolutions(challengeId?: string) {
    return useQuery<ISolution[]>({
        enabled: !!challengeId,
        queryKey: ['solutions', challengeId],
        queryFn: async () => {
            const response = await api.getSolutions(challengeId);

            return response;
        },
    });
};

export function useCreateSolution() {
    const { invalidate } = useInvalidateSolutions();

    return useMutation({
        mutationFn: async (solution: ICreateSolutionDto) => {
            const response = await api.createSolution(solution);

            return response;
        },
        onSuccess: invalidate,
    });
};