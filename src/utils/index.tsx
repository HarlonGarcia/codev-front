import { Translation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import {
  FaBook,
  FaCodeBranch,
  FaCopy,
  FaGithub,
  FaInfoCircle,
  FaUserCircle,
} from 'react-icons/fa';

import { URL_DEPLOY, URL_REPOSITORY } from './constants';

interface IShortcutInfo {
  icon: JSX.Element;
  title: JSX.Element;
  keys: string[];
  action: () => void;
}

interface IShortcuts {
  [key: string]: IShortcutInfo;
}

export const goToShortcuts: IShortcuts = {
  H: {
    icon: <AiFillHome />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.home')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'H' ],
    action: () => {
      location.href ='/';
    }
  },
  C: {
    icon: <FaCodeBranch />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.challenges')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'C' ],
    action: () => {
      location.href ='/challenges';
    }
  },
  S: {
    icon: <FaInfoCircle />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.about')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'S' ],
    action: () => {
      location.href ='/about';
    }
  },
  T: {
    icon: <FaBook />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.tips')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'T' ],
    action: () => {
      location.href ='/tips';
    }
  },
  Q: {
    icon: <FaUserCircle />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.profile')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'Q' ],
    action: () => {
      location.href ='/my_account';
    }
  },
};

export const extraShortcuts: IShortcuts = {
  U: {
    icon: <FaCopy />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.copy')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'U' ],
    action: () => {
      navigator.clipboard
        .writeText(URL_DEPLOY)
        .catch((error) => console.error(error));
    }
  },
  G: {
    icon: <FaGithub  />,
    title: (
      <Translation>
        {(t) => <span>{t('components.commander.commands.github')}</span>}
      </Translation>
    ),
    keys: [ '⌘', 'G' ],
    action: () => {
      window.open(URL_REPOSITORY, '_blank');
    }
  },
};