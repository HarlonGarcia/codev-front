import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import Typer from '../../components/Typer';
import { AppDispatch } from '../../store';
import { getChallenges } from '../../store/slices/challenge';
import { getTechnologies } from '../../store/slices/technology';
import { getMe } from '../../store/slices/user';
import { useSelector } from '../../store/useSelector';
import { getCookie } from '../../utils';
import { defaultTransition } from '../../utils/animations';
import { AUTH_KEY } from '../../utils/constants';
import * as S from './styles';
import { possibilities } from './utils';
import {
  containerVariants,
  itemVariants,
  sectionAnimationProps,
} from './utils/animation';
import { technologiesIcons as techIcons } from './utils/icons';

const WelcomeSection = () => {
  const { t } = useTranslation();

  return (
    <S.Hero>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={defaultTransition}
      >
        <S.Title font='code'>
          {'=> '}
          <Typer />
        </S.Title>
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

export default function Home() {
  const { t } = useTranslation();
  const token = getCookie(AUTH_KEY);

  const dispatch = useDispatch<AppDispatch>();

  const { items: technologies } = useSelector((state) => state.technologies);
  const { items: challenges } = useSelector((state) => state.challenges);
  const { currentUser } = useSelector((state) => state.users);

  const hydratedTechnologies = useMemo(() => {
    const technologiesWithIcons = technologies.map((technology) => {
      const slug = Object.keys(techIcons).find(
        (key) => technology.slug.toLowerCase().includes(key)
      );

      return {
        ...technology,
        logo: slug && techIcons[slug],
      };
    });

    return technologiesWithIcons.slice(0, 12);
  }, [technologies]);

  useEffect(() => {
    dispatch(getTechnologies());
    dispatch(getChallenges({
      orderBy: 'latest',
      page: 0,
      size: 4,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!token || !!currentUser) {
      return;
    }

    dispatch(getMe());
  }, [ dispatch, token, currentUser ]);

  return (
    <S.Container>
      <WelcomeSection />
      <S.Section {...sectionAnimationProps}>
        <S.Title>{t('pages.home.introduction.title')}</S.Title>
        <S.Paragraph>{t('pages.home.introduction.description')}</S.Paragraph>
        <S.Possibilities
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2.5 }}
        >
          {possibilities.map(({ id, label, icon }, index) => (
            <S.CardItem
              key={id}
              animation={index % 2 !== 0 ? 'diff' : undefined}
              variants={itemVariants}
            >
              {label}
              {icon}
            </S.CardItem>
          ))}
        </S.Possibilities>
      </S.Section>

      <S.Section {...sectionAnimationProps}>
        <S.Title>{t('pages.home.technologies.title')}</S.Title>
        <S.Paragraph>{t('pages.home.technologies.description')}</S.Paragraph>
        <S.Technologies>
          {hydratedTechnologies.map(({ id, name, color, logo }) => (
            <S.Tech key={id}>
              <span style={{ color }}>
                {logo}
              </span>
              <small>{name}</small>
            </S.Tech>
          ))}
        </S.Technologies>
      </S.Section>

      <S.Section {...sectionAnimationProps}>
        <S.Title>{t('pages.home.challenges.title')}</S.Title>
        <S.Paragraph>{t('pages.home.challenges.description')}</S.Paragraph>

        <S.LatestChallenges>
          <S.ChallengeList>
            {challenges.map(({ id, title }) => (
              <div key={id}>
                <small>{title}</small>
                <span>{t('pages.home.challenges.badge')}</span>
              </div>
            ))}
          </S.ChallengeList>
          <div className='expand_challenges' />
        </S.LatestChallenges>
        <Link to='/challenges'>{t('pages.home.challenges.button.text')}</Link>
      </S.Section>
    </S.Container>
  );
}