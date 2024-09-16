import { Translation } from 'react-i18next';

import { ChallengeStatusEnum } from 'types/enums/challenge';

export const statuses = [
  {
    key: 'to-begin',
    label: (
      <Translation>
        {(t) => <>{t('global.challenges.status.to_begin')}</>}
      </Translation>
    ),
    value: ChallengeStatusEnum.TO_BEGIN,
  },
  {
    key: 'in-progress',
    label: (
      <Translation>
        {(t) => <>{t('global.challenges.status.in_progress')}</>}
      </Translation>
    ),
    value: ChallengeStatusEnum.IN_PROGRESS,
  },
];

export const statusIcons: Record<ChallengeStatusEnum, {
  label: JSX.Element;
  color: string;
}> = {
  IN_PROGRESS: {
    label: (
      <Translation>
        {(t) => <span>{t('global.challenges.status.in_progress')}</span>}
      </Translation>
    ),
    color: 'green',
  },
  TO_BEGIN: {
    label: (
      <Translation>
        {(t) => <span>{t('global.challenges.status.to_begin')}</span>}
      </Translation>
    ),
    color: 'green',
  },
  FINISHED: {
    label: (
      <Translation>
        {(t) => <span>{t('global.challenges.status.finished')}</span>}
      </Translation>
    ),
    color: 'yellow',
  },
  CANCELED: {
    label: (
      <Translation>
        {(t) => <span>{t('global.challenges.status.canceled')}</span>}
      </Translation>
    ),
    color: 'red',
  },
};