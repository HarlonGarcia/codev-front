import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import * as S from './styles';
import { Category } from '../../types/Category';
import { useCustomSelector } from '../../store/useCustomSelector';
import { AppDispatch } from '../../store';
import { getCategories } from '../../store/features/categorySlice';
import { getChallenges } from '../../store/features/challengeSlice';
import { statusIcons } from './utils';

interface ChallengesGroupProps {
  category: Category;
}

function ChallengesGroup({ category }: ChallengesGroupProps) {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const [ carouselWidth, setCarouselWidth ] = useState(0);
  
  const { challenges } = useCustomSelector((state) => state.challenges);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => challenge.category?.id === category.id);
  }, [ challenges, category.id ]);

  useEffect(() => {
    if (carouselRef.current) {
      const element = carouselRef.current as HTMLDivElement;
      setCarouselWidth(element.scrollWidth - element.offsetWidth);
    }
  }, [category]);

  if (filteredChallenges.length <= 0) return;
  return (
    <S.GroupContainer>
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
          {filteredChallenges.map(({ id, title, status }) => (
            <S.Challenge key={id}>
              <S.ChallengeHeader>
                <h2>{title || t('pages.challenges.main.title')}</h2>
                {status &&
                  <span className={statusIcons[status]?.color}>
                    {statusIcons[status]?.label}
                    <GrStatusGoodSmall />
                  </span>
                }
              </S.ChallengeHeader>
              <S.Image 
                src="https://picsum.photos/id/237/200/300" 
                alt={title}
                loading='lazy'
              />
              <S.JoinChallenge
                onClick={() => navigate(`/challenges/${id}`)}
                disabled={status === 'FINISHED'}
              >
                {t('pages.challenges.main.join')}
              </S.JoinChallenge>
            </S.Challenge>
          ))}
        </motion.div>
      </motion.div>
      <div className="separator" />
    </S.GroupContainer>
  );
}

export default function Challenges() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useCustomSelector((state) => state.categories);

  useEffect(() => {
    Promise.all([
      dispatch(getCategories()), 
      dispatch(getChallenges())
    ]);
  }, [dispatch]);

  return (
    <S.Container>
      {categories.map((category) => (
        <ChallengesGroup key={category.id} category={category} />
      ))}
    </S.Container>
  );
}
