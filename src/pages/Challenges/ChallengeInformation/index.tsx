import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Markdown from 'components/Markdown';
import dayjs from 'dayjs';
import PageNotFound from 'pages/PageNotFound';
import { PiCodeDuotone } from 'react-icons/pi';
import { useChallenge, useJoinChallenge } from 'services/challenge';
import { DATE_TIME } from 'utils/constants';

import * as S from './styles';

export default function ChallengeInformation() {
  const { id: challengeId } = useParams();
  const { t } = useTranslation();

  const { data: currentChallenge } = useChallenge(challengeId);
  const { mutate: joinChallenge } = useJoinChallenge();

  const {
    title = t('pages.challenge_information.unknown_title'),
    description = t('pages.challenge_information.unknown_description'),
    author,
    image,
    technologies = [],
  } = currentChallenge || {};

  if (!currentChallenge) {
    return (
      <PageNotFound
        placeholder={t('pages.challenge_information.page_not_found.placeholder')}
      />
    )
  };

  return (
    <S.Container>
      <S.Header>
        <h2>{title}</h2>
        <span>
          <strong>Criado em:</strong>
          {dayjs(currentChallenge.createdAt).format(DATE_TIME)}
        </span>
      </S.Header>
      {image?.file && (
        <S.Cover src={`data:image/jpeg;base64,${image?.file}`} />
      )}
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
        <S.Button onClick={() => joinChallenge(currentChallenge.id)}>
          <PiCodeDuotone />
          <strong>{t('pages.challenge_information.submit.label')}</strong>
        </S.Button>
      </S.Details>
    </S.Container>
  );
}
