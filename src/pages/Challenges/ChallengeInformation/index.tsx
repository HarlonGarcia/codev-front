import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PiCodeDuotone } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Markdown from '../../../components/Markdown';
import { AppDispatch } from '../../../store';
import {
  getChallengeById,
  joinChallenge,
} from '../../../store/slices/challenge';
import { useSelector } from '../../../store/useSelector';
import * as S from './styles';

export default function ChallengeInformation() {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { currentChallenge } = useSelector((state) => state.challenges);
  const {
    id: challengeId,
    title = t('pages.challenge_information.unknown_title'),
    description = t('pages.challenge_information.unknown_description'),
    author,
    technologies = [],
  } = currentChallenge || {};

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getChallengeById(id));
  }, [ dispatch, id ]);

  if (!currentChallenge) return;
  return (
    <S.Container>
      <h2>{title}</h2>
      <Markdown content={description} />
      <S.Details>
        <S.Info>
          {author ? (
            <div>
              <span>{t('pages.challenge_information.created_by')}</span>
              <span>{author.name}</span>
            </div>
          ) : (
            <small>{t('pages.challenge_information.unknown_author')}</small>
          )}
          <S.Technologies>
            {technologies.map((technology, index) => (
              <li key={technology.id + index}>
                {technology.name}
              </li>
            ))}
          </S.Technologies>
        </S.Info>
        <S.Button onClick={() => dispatch(joinChallenge(challengeId))}>
          <PiCodeDuotone />
          <strong>{t('pages.challenge_information.submit.label')}</strong>
        </S.Button>
      </S.Details>
    </S.Container>
  );
}
