import { Translation } from 'react-i18next';

import { Svg } from 'assets/svg';
import {
  FaAngular,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaDocker,
  FaPython,
} from 'react-icons/fa';
import { FaJava } from 'react-icons/fa6';
import {
  SiSpring,
  SiQuarkus,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
} from 'react-icons/si';
import { defaultTransition } from 'utils/animations';

export const possibilities = [{
  id: 'solution',
  label: (
    <Translation>
      {(t) => <span>{t('pages.home.introduction.cards.find_solutions')}</span>}
    </Translation>
  ),
  icon: <Svg.Solution />,
},
{
  id: 'coding',
  label: (
    <Translation>{
      (t) => <span>{t('pages.home.introduction.cards.coding')}</span>}
    </Translation>
  ),
  icon: <Svg.Code />,
},
{
  id: 'network',
  label: (
    <Translation>
      {(t) => <span>{t('pages.home.introduction.cards.network')}</span>}
    </Translation>
  ),
  icon: <Svg.Network />,
}];

export const technologiesIcons: Record<string, React.ReactNode> = {
  java: <FaJava />,
  js: <SiJavascript />,
  ts: <SiTypescript />,
  quarkus: <SiQuarkus />,
  node: <FaNodeJs />,
  react: <FaReact />,
  angular: <FaAngular />,
  vue: <FaVuejs />,
  spring: <SiSpring />,
  docker: <FaDocker />,
  tailwind: <SiTailwindcss />,
  python: <FaPython />,
};

export const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const sectionAnimationProps = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: defaultTransition,
};