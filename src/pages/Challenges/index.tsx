import { useNavigate } from 'react-router-dom';

import { useCategories } from 'services/category';

import ChallengesGroup from './partials/ChallengesGroup';
import * as S from './styles';

export default function Challenges() {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();

  return (
    <S.Container>
      {categories.map((category) => (
        <ChallengesGroup key={category.id} category={category} />
      ))}
      <button onClick={() => navigate('/new')}>
        Criar desafio
      </button>
    </S.Container>
  );
}
