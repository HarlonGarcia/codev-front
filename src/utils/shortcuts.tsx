import { NavigateFunction } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaBook, FaCodeBranch, FaCopy, FaGithub, FaInfoCircle, FaUserCircle } from 'react-icons/fa';

import { URL_DEPLOY, URL_REPOSITORY } from './constants';

interface ShortcutInfo {
  icon: JSX.Element;
  title: string;
  keys: string[];
}

interface RouteShortcut extends ShortcutInfo {
  goTo: (navigate: NavigateFunction) => void; // eslint-disable-line no-unused-vars
}

interface ExtraShortcut extends ShortcutInfo {
  action: () => void;
}

interface RoutesShortcuts {
  [key: string]: RouteShortcut;
}

interface ExtraShortcuts {
  [key: string]: ExtraShortcut;
}

export const goToShortcuts: RoutesShortcuts = {
  H: {
    icon: <AiFillHome />,
    title: 'Ínicio',
    keys: ['H'],
    goTo: (navigate) => {
      navigate('/');
    }
  },
  C: {
    icon: <FaCodeBranch />,
    title: 'Desafios',
    keys: ['C'],
    goTo: (navigate) => { navigate('/challenges'); }
  },
  A: {
    icon: <FaInfoCircle />,
    title: 'Sobre',
    keys: ['A'],
    goTo: (navigate) => {
      navigate('/about');
    }
  },
  T: {
    icon: <FaBook />,
    title: 'Dicas',
    keys: ['T'],
    goTo: (navigate) => {
      navigate('/tips');
    }
  },
  Q: {
    icon: <FaUserCircle />,
    title: 'Meu perfil',
    keys: ['Q'],
    goTo: (navigate) => {
      navigate('/my_account');
    }
  },
};

export const extraShortcuts: ExtraShortcuts = {
  U: {
    icon: <FaCopy />,
    title: 'Copiar url',
    keys: ['U'],
    action: () => {
      navigator.clipboard.writeText(URL_DEPLOY).then().catch((error) => console.log(error));
    }
  },
  G: {
    icon: <FaGithub  />,
    title: 'Ver github',
    keys: ['G'],
    action: () => {
      window.open(URL_REPOSITORY, '_blank');
    }
  },
};