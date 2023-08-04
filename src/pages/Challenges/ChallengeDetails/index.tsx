import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PiCodeDuotone } from 'react-icons/pi';

import * as S from './styles';
import Markdown from '../../../components/Markdown';
import { AppDispatch } from '../../../store';
import { getChallengeById } from '../../../store/features/challengeSlice';
import { useCustomSelector } from '../../../store/useCustomSelector';

export default function ChallengeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { currentChallenge: challenge } = useCustomSelector((state) => state.challenges);

  const getChallenge = useCallback(() => {
    if (id) dispatch(getChallengeById(id));
  }, [ dispatch, id ]);

  useEffect(() => {
    getChallenge();
  }, [getChallenge]);

  if (!challenge) return;
  return (
    <S.Container>
      <h2>{challenge?.title || 'Title not found'}</h2>
      <Markdown content={challenge.description || 'No description'} />
      <S.Footer>
        <S.Info>
          <h3>Desafio criado por{' '}
            <strong>{challenge.author.name || 'No author'}</strong>
          </h3>
          <S.Technologies>
            {
              [ 'Java', 'SQL' ].map((tech, index) => (
                <li key={tech + index}>
                  {tech}
                </li>
              ))
            }
          </S.Technologies>
        </S.Info>
        <S.JoinChallengeButton>
          <span>
            <PiCodeDuotone />
          </span>
          <strong>
            Participar do desafio
          </strong>
        </S.JoinChallengeButton>
      </S.Footer>
    </S.Container>
  );
}
