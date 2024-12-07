import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import i18next from 'i18next';
import { ILoginPayload, IUser } from 'types';

import * as api from './requests';

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: ILoginPayload) => {
            const response = await api.login(payload);

            return response;
        },
        onError: () => {
            toast.error(i18next.t('global.alerts.errors.default'))
        },
    });
};

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (payload: IUser) => {
            const response = await api.signUp(payload);

            return response;
        },
        onError: () => {
            toast.error(i18next.t('global.alerts.errors.default'))
        },
    });
};

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await api.refreshToken();

            return response;
        },
        onError: () => {
            toast.error(i18next.t('global.alerts.errors.401'))
        },
    });
};