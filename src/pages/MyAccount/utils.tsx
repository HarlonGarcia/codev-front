import { Translation } from 'react-i18next';

import { FaCode, FaUsers } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

export interface IUserOption {
  label: JSX.Element;
  icon: JSX.Element;
  redirectUrl?: string;
  action?: () => void;
}

export const options: IUserOption[] = [
  {
    label: (
      <Translation>
        {(t) => <span>{t('pages.account.options.challenges')}</span>}
      </Translation>
    ),
    icon: <FaCode />,
    redirectUrl: '/challenges'
  },
  {
    label: (
      <Translation>
        {(t) => <span>{t('pages.account.options.edit_information')}</span>}
      </Translation>
    ),
    icon: <MdEdit />,
  },
  {
    label: (
      <Translation>
        {(t) => <span>{t('pages.account.options.connections')}</span>}
      </Translation>
    ),
    icon: <FaUsers />,
    redirectUrl: '/users'
  }
];