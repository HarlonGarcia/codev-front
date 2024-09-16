import { useTranslation } from 'react-i18next';

import Typer from 'components/Typer';
import { motion } from 'framer-motion';
import { Title } from 'pages/Home/styles';
import { defaultTransition } from 'utils/animations';

import * as S from './styles';

export const WelcomeSection = () => {
  const { t } = useTranslation();
  
  return (
    <S.Hero>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={defaultTransition}
      >
        <Title font='code'>
          {'=> '}
          <Typer />
        </Title>
        <S.Instruction>
          {t('pages.home.instructions.press') + ' '}
          <span><span>⌘</span></span>
            +
          <span><span>K</span></span>
          {' ' + t('pages.home.instructions.action')}
        </S.Instruction>
      </motion.div>
    </S.Hero>
  );
};