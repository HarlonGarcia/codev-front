import { useUserChallenges } from 'services/user';

import * as S from './styles';

export default function MyChallenges() {
  const { data: challenges = [] } = useUserChallenges();

  return (
    <S.Container>
      Meus desafios
      {0 >= challenges.length ? (
        <div>
          Nenhum desafio encontrado. Adicione um novo desafio para começar.
        </div>
      ): challenges.map(({ id, title }) => (
        <span key={id}>{title}</span>
      ))}
      
    </S.Container>
  );
}
