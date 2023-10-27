import { FaCode, FaUsers } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { Translation } from 'react-i18next';

export interface UserOption {
  label: JSX.Element;
  icon: JSX.Element;
  redirectUrl?: string;
  action?: () => void;
  isAuthorizationRequired?: (role: string) => boolean; // eslint-disable-line
}

export const options: UserOption[] = [
  {
    label: <Translation>{(t) => <span>{t('pages.my_account.options.challenges')}</span>}</Translation>,
    icon: <FaCode />,
    redirectUrl: '/challenges'
  },
  {
    label: <Translation>{(t) => <span>{t('pages.my_account.options.info')}</span>}</Translation>,
    icon: <MdEdit />,
    isAuthorizationRequired: (role) => role.toLowerCase() === 'admin',
  }, 
  {
    label: <Translation>{(t) => <span>{t('pages.my_account.options.friends')}</span>}</Translation>,
    icon: <FaUsers />,
    redirectUrl: '/users'
  }
];