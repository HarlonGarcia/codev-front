import { useEffect, useMemo } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import Typer from '../../components/Typer';
import { AppDispatch } from '../../store';
import { getFilteredChallenges } from '../../store/features/challengeSlice';
import { getTechnologies } from '../../store/features/technologySlice';
import { useSelector } from '../../store/useSelector';
import { defaultTransition } from '../../utils/animations';
import { possibilities } from '../../utils/userOptions/possibilitiesCards';
import * as S from './styles';
import {
  containerVariants,
  itemVariants,
  sectionAnimationProps,
} from './utils/animation';
import { technologiesIcons as techIcons } from './utils/icons';

const WelcomeSection = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });
  const a = useAuthUser();

  console.log(a);

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
          {t('instruction.press') + ' '}
          <span><span>⌘</span></span>
          +
          <span><span>K</span></span>
          {' ' + t('instruction.action')}
        </S.Instruction>
      </motion.div>
    </S.Hero>
  );
};

export default function Home() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });

  const dispatch = useDispatch<AppDispatch>();

  const { technologies } = useSelector((state) => state.technologies);
  const { latestChallenges: challenges } = useSelector(
    (state) => state.challenges
  );

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
    dispatch(getFilteredChallenges({
      orderBy: 'latest',
      page: 0,
      size: 4,
    }));
  }, [dispatch]);

  return (
    <S.Container>
      <WelcomeSection />
      <S.Section {...sectionAnimationProps}>
        <S.Title>{t('goals.title')}</S.Title>
        <S.Paragraph>{t('goals.description')}</S.Paragraph>
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
        <S.Title>{t('technologies.title')}</S.Title>
        <S.Paragraph>{t('technologies.description')}</S.Paragraph>
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
        <S.Title>{t('latest.title')}</S.Title>
        <S.Paragraph>{t('latest.description')}</S.Paragraph>

        <S.LatestChallenges>
          <S.ChallengeList>
            {challenges.map(({ id, title }) => (
              <div key={id}>
                <small>{title}</small>
                <span>{t('latest.badge')}</span>
              </div>
            ))}
          </S.ChallengeList>
          <div className='expand_challenges' />
        </S.LatestChallenges>
        <Link to='/challenges'>{t('latest.link')}</Link>
      </S.Section>
    </S.Container>
  );
}