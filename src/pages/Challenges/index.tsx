import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../services';
import { getCategories } from '../../services/slices/category';
import { getChallenges } from '../../services/slices/challenge';
import { useSelector } from '../../services/useSelector';
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
