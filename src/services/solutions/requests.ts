import { api } from 'api';
import { generateUrl, toBase64 } from 'services/utils';

import { ICreateSolutionDto } from './types';

export const getSolutions = async (challengeId?: string) => {
    const { data } = await api.get(
        generateUrl('solutions', { challengeId }),
    );

    return data ?? {};
}

export const createSolution = async ({ image, ...rest }: ICreateSolutionDto) => {
    const fileBase64 = !!image && await toBase64(image);

    const imagePayload = {
        file: fileBase64,
        fileName: image?.name,
    };

    const { data } = await api.post(
        generateUrl('challenge_solutions'),
        {
            ...rest,
            authorId: rest.userId,
            image: fileBase64 ? imagePayload : undefined,
        },
    );

    return data ?? {};
}