import i18next from 'i18next';
import { ChallengeStatusEnum } from 'types';

export type StatusEnumValue = {
  id: string;
  label: string;
  color: string;
};

export const challengeStatuses: Record<ChallengeStatusEnum, StatusEnumValue> = {
    get TO_BEGIN() {
        return {
            id: 'TO_BEGIN',
            label: i18next.t('global.challenges.status.to_begin'),
            color: '#234fff',
        };
    },
    get IN_PROGRESS() {
        return {
            id: 'IN_PROGRESS',
            label: i18next.t('global.challenges.status.in_progress'),
            color: '#50fa7b',
        };
    },
    get FINISHED() {
        return {
            id: 'FINISHED',
            label: i18next.t('global.challenges.status.finished'),
            color: '#ff5555',
        };
    },
    get CANCELED() {
        return {
            id: 'CANCELED',
            label: i18next.t('global.challenges.status.canceled'),
            color: '#ff5555',
        };
    },
};

export const getChallengeStatus = (status: ChallengeStatusEnum) => {
    return Object.values(challengeStatuses)
        .find(({ id }) => id === status);
}