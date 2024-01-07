import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as S from './styles';
import { useCustomSelector } from '../../store/useCustomSelector';
import { AppDispatch } from '../../store';
import { getCategories } from '../../store/features/categorySlice';
import ChallengesGroup from '../../components/ChallengesGroup';
import { getChallenges } from '../../store/features/challengeSlice';

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
