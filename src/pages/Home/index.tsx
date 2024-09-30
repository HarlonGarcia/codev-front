import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { motion } from 'framer-motion';
import { useChallenges } from 'services/challenge';
import { useTechnologies } from 'services/technology';

import { Section } from './partials/Section';
import { WelcomeSection } from './partials/Welcome';
import {
  containerVariants,
  itemVariants,
  possibilities,
  technologiesIcons as techIcons,
} from './utils';

export default function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(AuthContext);
    
  const { data: technologiesItems = [] } = useTechnologies({
    enabled: isAuthenticated,
  });

  const { data: challenges = [] } = useChallenges({
    page: 0,
    size: 4,
  });

  const technologies = useMemo(() => {
    const items = technologiesItems?.map((technology) => {
      const slug = Object.keys(techIcons)
        .find((key) => technology.slug?.toLowerCase().includes(key));

      return {
        ...technology,
        logo: slug && techIcons[slug],
      };
    });

    return items.slice(0, 12);
  }, [technologiesItems]);

  return (
    <div>
      <WelcomeSection />
      <Section
        title={t('pages.home.introduction.title')}
        description={t('pages.home.introduction.description')}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 2.5 }}
        >
          {possibilities.map(({ id, label, icon }) => (
            <motion.li
              key={id}
              variants={itemVariants}
            >
              {label}
              {icon}
            </motion.li>
          ))}
        </motion.div>
      </Section>

      {technologies.length > 0 && (
        <Section
          title={t('pages.home.technologies.title')}
          description={t('pages.home.technologies.description')}
        >
          <motion.ul>
            {technologies.map(({ id, name, color, logo }) => (
              <motion.li key={id}>
                <span style={{ color }}>
                  {logo}
                </span>
                <small>{name}</small>
              </motion.li>
            ))}
          </motion.ul>
        </Section>
      )}

      {challenges.length > 0 && (
        <Section
          title={t('pages.home.challenges.title')}
          description={t('pages.home.challenges.description')}
        >
          <>
            <div>
              <div>
                {challenges.map(({ id, title }) => (
                  <div key={id}>
                    <small>{title}</small>
                    <span>{t('pages.home.challenges.badge')}</span>
                  </div>
                ))}
              </div>
              <div className='expand_challenges' />
            </div>
            <Link to='/challenges'>{t('pages.home.challenges.button.text')}</Link>
          </>
        </Section>
      )}
    </div>
  );
}