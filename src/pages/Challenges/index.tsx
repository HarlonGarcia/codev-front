import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as S from './styles';
import { useCustomSelector } from '../../store/useCustomSelector';
import { AppDispatch } from '../../store';
import { getAllCategories } from '../../store/features/categorySlice';
import ChallengesGroup from '../../components/ChallengesGroup';
import { getAllChallenges } from '../../store/features/challengeSlice';

export default function Challenges() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useCustomSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllChallenges());
  }, [dispatch]);

  return (
    <S.Container>
      {categories.map((category) => (
        <ChallengesGroup key={category.id} category={category} />
      ))}
    </S.Container>
  );
}
