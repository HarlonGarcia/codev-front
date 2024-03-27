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