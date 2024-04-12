import { useEffect, useMemo, useRef, useState } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import { useSelector } from '../../../../store/useSelector';
import { ICategory } from '../../../../types/Category';
import * as S from './styles';

interface ChallengesGroupProps {
  category: ICategory;
}

const statusIcons = {
  IN_PROGRESS: {
    label:
      <Translation>{(t) => <span>{t('global.challenges.status.in_progress')}</span>}</Translation>,
    color: 'green',
  },
  TO_BEGIN: {
    label:
      <Translation>{(t) => <span>{t('global.challenges.status.to_begin')}</span>}</Translation>,
    color: 'green',
  },
  FINISHED: {
    label:
      <Translation>{(t) => <span>{t('global.challenges.status.finished')}</span>}</Translation>,
    color: 'yellow',
  },
  CANCELED: {
    label:
      <Translation>{(t) => <span>{t('global.challenges.status.canceled')}</span>}</Translation>,
    color: 'red',
  },
};

export default function ChallengesGroup({ category }: ChallengesGroupProps) {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const [ carouselWidth, setCarouselWidth ] = useState(0);

  const { challenges } = useSelector((state) => state.challenges);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) =>
      challenge.category?.id === category.id);
  }, [ challenges, category.id ]);

  useEffect(() => {
    if (carouselRef.current) {
      const element = carouselRef.current as HTMLDivElement;
      setCarouselWidth(element.scrollWidth - element.offsetWidth);
    }
  }, [category]);

  if (filteredChallenges.length <= 0) return;
  return (
    <S.Container>
      <h2>{category.name}</h2>
      <motion.div
        ref={carouselRef}
        className='carousel'
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          className='carousel_inner'
          drag="x"
          dragConstraints={{ left: -carouselWidth, right: 0 }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredChallenges.map((challenge) => (
            <S.Challenge key={challenge.id}>
              <S.ChallengeHeader>
                <h2>
                  {challenge.title || t('pages.challenges.unknown_title')}
                </h2>
                {challenge.status &&
                  <span className={statusIcons[challenge.status]?.color}>
                    {statusIcons[challenge.status]?.label}
                    <GrStatusGoodSmall />
                  </span>
                }
              </S.ChallengeHeader>
              <S.Image
                src="https://picsum.photos/id/237/200/300"
                alt={challenge.title}
                loading='lazy'
              />
              <S.JoinChallenge
                onClick={() => navigate(`/challenges/${challenge.id}`)}
                disabled={challenge.status === 'FINISHED'}
              >
                {t('pages.challenges.see_challenge')}
              </S.JoinChallenge>
            </S.Challenge>
          ))}
        </motion.div>
      </motion.div>
      <div className="separator" />
    </S.Container>
  );
}