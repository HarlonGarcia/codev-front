import { api } from 'api';
import { getObjectDiff } from 'utils';

import { generateUrl, toBase64 } from '../utils';
import { IUpdateUserDto } from './types';

export const getMe = async () => {
    const { data } = await api.get(generateUrl('me'));

    return data ?? {};
}

export const getUsers = async () => {
    const { data } = await api.get(generateUrl('users'));

    return data ?? [];
}

export const updateUser = async ({
    identifier,
    user,
    newUser,
}: IUpdateUserDto) => {
    const { image, ...newValues } = newUser;

    const fileBase64 = image && await toBase64(image);
    const newImage = image
        ? {
            file: fileBase64,
            fileName: image?.name,
        }
        : null;

    const body = getObjectDiff({
        base: user,
        target: newValues,
    });

    const { data } = await api.put(
        generateUrl('users', { identifier }),
        {
            ...body,
            image: newImage,
        },
    );

    return data;
}

export const getUserChallenges = async (userId?: string) => {
    if (!userId) {
        throw new Error('The user or challenge is not valid.');
    }

    const { data } = await api.get(
        generateUrl('user_challenges', { userId }),
    );

    return data ?? [];
}

export const getUserMetrics = async (userId?: string) => {
    const { data } = await api.get(
        generateUrl('user_metrics', { userId }),
    );

    return data ?? [];
}
