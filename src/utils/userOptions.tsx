import { FaCode } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

export interface UserOption {
  label: string;
  icon: JSX.Element;
  redirectUrl?: string;
  action?: () => void;
  isAuthorizationRequired?: (role: string) => boolean; // eslint-disable-line
}

export const options: UserOption[] = [
  {
    label: 'Desafios que estou participando',
    icon: <FaCode />,
    redirectUrl: '/challenges'
  },
  {
    label: 'Editar informações',
    icon: <MdEdit />,
    isAuthorizationRequired: (role) => role === 'admin',
  }
];