import { api } from 'api';

import { generateUrl, toBase64 } from '../utils';
import { ICreateChallengeDto, IGetChallengeParams, IJoinChallengeDto } from './types';

export const getChallenges = async (filters?: IGetChallengeParams) => {
    const { data } = await api.get(
        generateUrl('challenges'),
        { params: filters }
    );
        
    return data ?? [];
}

export const getChallenge = async (challengeId?: string) => {
    const { data } = await api.get(
        generateUrl('challenges', { identifier: challengeId })
    );

    return data ?? {};
}

export const getParticipants = async (challengeId?: string) => {
    const { data } = await api.get(
        generateUrl('challenge_users', { challengeId })
    );

    return data ?? [];
}

export const joinChallenge = async ({ userId, challengeId }: IJoinChallengeDto) => {
    if (!challengeId || !userId) {
        throw new Error('The user or challenge is not valid.');
    }

    const response = await api.post(
        generateUrl('challenge_users', { challengeId }),
        null,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': userId,
            },
        },
    );


    return response.data;
}

export const unjoinChallenge = async ({ userId, challengeId }: IJoinChallengeDto) => {
    if (!challengeId || !userId) {
        throw new Error('The user or challenge is not valid.');
    }

    const response = await api.delete(
        generateUrl('challenge_users', { challengeId }),
        {
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': userId,
            },
        },
    );


    return response.data;
}

export const createChallenge = async ({
    image,
    ...challenge
}: ICreateChallengeDto) => {
    const fileBase64 = !!image && await toBase64(image);

    const imagePayload = {
        file: fileBase64,
        fileName: image?.name,
    };

    const { data } = await api.post(
        generateUrl('challenges'), {
            ...challenge,
            image: image ? imagePayload : undefined,
        },
    );

    return data ?? {};
}

export const deleteChallenge = async (identifier: string) => {
    const response = await api.delete(
        generateUrl('challenges', { identifier }),
    );

    return response.data;
}