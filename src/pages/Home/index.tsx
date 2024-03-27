import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import * as S from './styles';
import Typer from '../../components/Typer';
import { useCustomSelector } from '../../store/useCustomSelector';
import { AppDispatch } from '../../store';
import { getFilteredChallenges } from '../../store/features/challengeSlice';
import { defaultTransition } from '../../utils/animations';
import { possibilities } from '../../utils/userOptions/possibilitiesCards';
import { useIsAuthenticated } from 'react-auth-kit';
import { getTechnologies } from '../../store/features/technologySlice';
import { technologiesIcons as techIcons } from './utils/icons';

const containerVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Home() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });

  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch<AppDispatch>();

  const { latestChallenges: challenges } = useCustomSelector((state) => state.challenges);
  const { technologies } = useCustomSelector((state) => state.technologies);

  const hydratedTechnologies = useMemo(() => {
    return technologies.map((technology) => {
      const techSlug = Object.keys(techIcons).find(
        (key) => technology.slug.toLowerCase().includes(key)
      );

      return {
        ...technology,
        logo: techSlug && techIcons[techSlug],
      };
    }).slice(0, 12);
  }, [technologies]);

  useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    dispatch(getFilteredChallenges({
      orderBy: 'LATEST',
      page: 0,
      size: 4,
    }));
  }, [dispatch]);

  return (
    <S.Container>
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
      <S.Section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={defaultTransition}
      >
        <S.Title>
          {t('goals.title')}
        </S.Title>
        <S.Paragraph>
          {t('goals.description')}
        </S.Paragraph>
        <S.Possibilities
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2.5 }}
        >
          {possibilities.map((possibility, index) => (
            <S.CardItem
              key={possibility.id}
              animation={index % 2 !== 0 ? 'diff' : undefined}
              variants={itemVariant}
            >
              {possibility.label}
              {possibility.icon}
            </S.CardItem>
          ))}
        </S.Possibilities>
      </S.Section>
      <S.Section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={defaultTransition}
      >
        <S.Title>
          {t('technologies.title')}
        </S.Title>
        <S.Paragraph>
          {t('technologies.description')}
        </S.Paragraph>
        {technologies.length > 0 && (
          <S.Technologies>
            {hydratedTechnologies.map(({ name, color, logo }, index) => (
              <S.Tech key={index}>
                <span style={{ color }}>
                  {logo}
                </span>
                <small>{name}</small>
              </S.Tech>
            ))}
          </S.Technologies>
        )}
      </S.Section>
      {challenges.length > 0 && (
        <S.Section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={defaultTransition}
        >
          <S.Title>
            {t('latest.title')}
          </S.Title>
          <S.Paragraph>
            {t('latest.description')}
          </S.Paragraph>
          <div className='latest_challenges'>
            <S.LatestChallenges>
              {challenges.map((challenge) => (
                <div key={challenge.id}>
                  <small>
                    {challenge.title}
                  </small>
                  <span>
                    {t('latest.badge')}
                  </span>
                </div>
              ))}
            </S.LatestChallenges>
            <div className='expand_challenges' />
          </div>
          <Link to='/challenges'>
            {t('latest.link')}
          </Link>
        </S.Section>
      )}
    </S.Container>
  );
}