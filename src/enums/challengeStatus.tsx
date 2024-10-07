import { Trans } from 'react-i18next';

import { ChallengeStatusEnum } from 'types';

type StatusEnumValue = {
  id: string;
  label: JSX.Element;
  color: string;
};

export const challengeStatuses: Record<ChallengeStatusEnum, StatusEnumValue> = {
  get TO_BEGIN() {
    return {
      id: 'TO_BEGIN',
      label: <Trans>{'global.challenges.status.to_begin'}</Trans>,
      color: '#234fff',
    };
  },
  get IN_PROGRESS() {
    return {
      id: 'IN_PROGRESS',
      label: <Trans>{'global.challenges.status.in_progress'}</Trans>,
      color: '#50fa7b',
    };
  },
  get FINISHED() {
    return {
      id: 'FINISHED',
      label: <Trans>{'global.challenges.status.finished'}</Trans>,
      color: '#ff5555',
    };
  },
  get CANCELED() {
    return {
      id: 'CANCELED',
      label: <Trans>{'global.challenges.status.canceled'}</Trans>,
      color: '#ff5555',
    };
  },
};

export const getChallengeStatus = (status: ChallengeStatusEnum) => {
  return Object.values(challengeStatuses).find(({ id }) => id === status);
}