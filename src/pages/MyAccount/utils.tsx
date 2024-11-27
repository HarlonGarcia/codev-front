import { Translation } from 'react-i18next';

import { FaCode, FaUsers } from 'react-icons/fa6';
import { HiOutlineViewGridAdd } from "react-icons/hi";
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
        redirectUrl: '/account/challenges'
    },
    {
        label: (
            <Translation>
                {(t) => <span>{t('pages.account.options.edit_information')}</span>}
            </Translation>
        ),
        icon: <MdEdit />,
        redirectUrl: '/account/edit'
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

export const adminOptions: IUserOption[] = [
    {
        label: (
            <Translation>
                {(t) => <span>{t('pages.account.options.new_challenge')}</span>}
            </Translation>
        ),
        icon: <HiOutlineViewGridAdd />,
        redirectUrl: '/dashboard/challenges/new-challenge'
    },
];