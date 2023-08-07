import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PiCodeDuotone } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

import * as S from './styles';
import Markdown from '../../../components/Markdown';
import { AppDispatch } from '../../../store';
import { getChallengeById } from '../../../store/features/challengeSlice';
import { useCustomSelector } from '../../../store/useCustomSelector';

export default function ChallengeDetails() {
  const { id } = useParams();
  const { t } = useTranslation('translation', { keyPrefix: 'pages.challenges.details' });
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
      <h2>{challenge?.title || t('title')}</h2>
      <Markdown content={challenge.description || t('description')} />
      <S.Footer>
        <S.Info>
          {challenge.author.name ? (
            <h3>{t('info.created') + ' '}
              <strong>{challenge.author.name}</strong>
            </h3>
          ) : (<h3>{t('info.author') + ' '}</h3>)}
          
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
            {t('join')}
          </strong>
        </S.JoinChallengeButton>
      </S.Footer>
    </S.Container>
  );
}
