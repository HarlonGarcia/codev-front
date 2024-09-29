import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { statusIcons } from 'pages/Challenges/utils';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { useChallenges } from 'services/challenge';

import * as S from './styles';

interface ChallengesGroupProps {
  category: ICategory;
}

export default function ChallengesGroup({ category }: ChallengesGroupProps) {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const [ carouselWidth, setCarouselWidth ] = useState(0);

  const { data: challenges = [] } = useChallenges();

  const getChallengeCover = (image?: string) => {
    return image ? `data:image/jpeg;base64,${image}` : 'https://picsum.photos/1280/720';
  };

  const filteredChallenges = useMemo(() => {
    return challenges.filter(
      (challenge) => challenge.category?.id === category.id,
    );
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
          {filteredChallenges.map(({ id, title, image, status }) => (
            <S.Challenge key={id}>
              <S.ChallengeHeader>
                <h2>{title || t('pages.challenges.unknown_title')}</h2>
                {status &&
                  <span className={statusIcons[status]?.color}>
                    {statusIcons[status]?.label}
                    <GrStatusGoodSmall />
                  </span>
                }
              </S.ChallengeHeader>
              <S.Image
                src={getChallengeCover(image?.file)}
                alt={title}
                loading='lazy'
              />
              <S.SeeChallenge
                onClick={() => navigate(`/challenges/${id}`)}
                disabled={status === 'FINISHED'}
              >
                {t('pages.challenges.see_challenge')}
              </S.SeeChallenge>
            </S.Challenge>
          ))}
        </motion.div>
      </motion.div>
      <div className="separator" />
    </S.Container>
  );
}
