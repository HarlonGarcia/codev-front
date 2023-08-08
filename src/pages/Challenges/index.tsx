import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { Translation, useTranslation } from 'react-i18next';

import * as S from './styles';
import { useCustomSelector } from '../../store/useCustomSelector';
import { AppDispatch } from '../../store';
import { getAllChallenges } from '../../store/features/challengeSlice';

const statusIcons = {
  IN_PROGRESS: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.in_progress')}</span>}</Translation>,
    color: 'green',
  },
  TO_BEGIN: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.to_begin')}</span>}</Translation>,
    color: 'green',
  },
  FINISHED: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.finished')}</span>}</Translation>,
    color: 'yellow',
  },
  CANCELED: {
    label: 
      <Translation>{(t) => <span>{t('pages.challenges.main.status.canceled')}</span>}</Translation>,
    color: 'red',
  },
};

export default function Challenges() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.challenges.main' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { challenges } = useCustomSelector((state) => state.challenges);

  const handleChallengeClick = (id: string) => {
    navigate(`/challenges/${id}`);
  };

  const getChallenges = useCallback(() => {
    dispatch(getAllChallenges());
  }, [dispatch]);

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

  return (
    <S.Container>
      <S.Challenges>
        {challenges.map((challenge) => (
          <S.Challenge 
            key={challenge.id} 
            onClick={() => handleChallengeClick(challenge.id)}>
            <S.ChallengeHeader>
              <h2>{challenge.title}</h2>
              <span className={statusIcons[challenge.status].color}>
                {statusIcons[challenge.status].label}
                <GrStatusGoodSmall />
              </span>
            </S.ChallengeHeader>
            <S.Image src="http://placekitten.com/200/300" alt={challenge.title} />
            <S.JoinChallenge>
              {t('join')}
            </S.JoinChallenge>
          </S.Challenge>
        ))}
      </S.Challenges>
    </S.Container>
  );
}
