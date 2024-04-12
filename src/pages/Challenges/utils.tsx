import { Translation } from 'react-i18next';

export const statusIcons = {
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