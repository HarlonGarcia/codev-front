import { AiFillHome } from 'react-icons/ai';
import { FaBook, FaCodeBranch, FaCopy, FaGithub, FaInfoCircle, FaUserCircle } from 'react-icons/fa';

import { URL_DEPLOY, URL_REPOSITORY } from './constants';

interface ShortcutInfo {
  icon: JSX.Element;
  title: string;
  keys: string[];
  action: () => void;
}

interface Shortcuts {
  [key: string]: ShortcutInfo;
}

export const goToShortcuts: Shortcuts = {
  H: {
    icon: <AiFillHome />,
    title: 'Ínicio',
    keys: [ '⌘', 'H' ],
    action: () => {
      location.href ='/';
    }
  },
  C: {
    icon: <FaCodeBranch />,
    title: 'Desafios',
    keys: [ '⌘', 'C' ],
    action: () => { location.href ='/challenges'; }
  },
  A: {
    icon: <FaInfoCircle />,
    title: 'Sobre',
    keys: [ '⌘', 'A' ],
    action: () => {
      location.href ='/about';
    }
  },
  T: {
    icon: <FaBook />,
    title: 'Dicas',
    keys: [ '⌘', 'T' ],
    action: () => {
      location.href ='/tips';
    }
  },
  Q: {
    icon: <FaUserCircle />,
    title: 'Meu perfil',
    keys: [ '⌘', 'Q' ],
    action: () => {
      location.href ='/my_account';
    }
  },
};

export const extraShortcuts: Shortcuts = {
  U: {
    icon: <FaCopy />,
    title: 'Copiar url',
    keys: [ '⌘', 'U' ],
    action: () => {
      navigator.clipboard.writeText(URL_DEPLOY).then().catch((error) => console.log(error));
    }
  },
  G: {
    icon: <FaGithub  />,
    title: 'Ver github',
    keys: [ '⌘', 'G' ],
    action: () => {
      window.open(URL_REPOSITORY, '_blank');
    }
  },
};