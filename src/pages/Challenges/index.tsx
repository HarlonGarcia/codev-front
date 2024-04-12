import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { getCategories } from '../../store/slices/category';
import { getChallenges } from '../../store/slices/challenge';
import { useSelector } from '../../store/useSelector';
import ChallengesGroup from './partials/ChallengesGroup';
import * as S from './styles';

export default function Challenges() {
  const dispatch = useDispatch<AppDispatch>();

  const { items: categories } = useSelector((state) => state.categories);

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
