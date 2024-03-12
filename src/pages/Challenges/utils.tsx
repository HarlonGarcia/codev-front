import { Translation } from 'react-i18next';

export const statusIcons = {
  IN_PROGRESS: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.in_progress')}</span>}</Translation>,
    color: 'green',
  },
  TO_BEGIN: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.to_begin')}</span>}</Translation>,
    color: 'green',
  },
  FINISHED: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.finished')}</span>}</Translation>,
    color: 'yellow',
  },
  CANCELED: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.canceled')}</span>}</Translation>,
    color: 'red',
  },
};