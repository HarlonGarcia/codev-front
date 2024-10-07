import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, AvatarGroup, WrapItem } from '@chakra-ui/react';
import Markdown from 'components/Markdown';
import { AuthContext } from 'contexts/AuthContext';
import dayjs from 'dayjs';
import PageNotFound from 'pages/PageNotFound';
import { LuUserPlus, LuUserX  } from "react-icons/lu";
import { useChallenge, useJoinChallenge, useParticipants, useUnjoinChallenge } from 'services/challenge';
import { getBase64Image } from 'utils';
import { DATE_TIME } from 'utils/constants';

import * as S from './styles';

export default function ChallengeInformation() {
  const { id: challengeId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { data: currentChallenge } = useChallenge(challengeId);
  const { data: participants = [] } = useParticipants(challengeId);

  const {
    mutate: joinChallenge,
    isPending: isJoiningChallenge,
  } = useJoinChallenge();

  const {
    mutate: unjoinChallenge,
    isPending: isUnjoiningChallenge,
  } = useUnjoinChallenge();

  const isParticipant = participants.some(({ id }) => id === user?.id);

  const handleParticipantAction = (id: string) => {
    if (!id) {
      return;
    }

    if (isParticipant) {
      unjoinChallenge(id);
      return;
    }

    joinChallenge(id);
  }

  const {
    title = t('pages.challenge_information.unknown_title'),
    description = t('pages.challenge_information.unknown_description'),
    author,
    image,
    technologies = [],
  } = currentChallenge || {};

  const isLoading = isJoiningChallenge || isUnjoiningChallenge;

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
          <strong>{t('pages.challenge_information.created_at')}</strong>
          {dayjs(currentChallenge.createdAt).format(DATE_TIME)}
        </span>
      </S.Header>
      {image?.file && (
        <S.Cover src={getBase64Image(image.file)} />
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
            {technologies.map(({ id, name }) => (
              <li key={id}>
                {name}
              </li>
            ))}
          </S.Technologies>
        </S.Info>
        <S.JoinChallengeArea>
          <AvatarGroup
            onClick={() => navigate(`/challenges/${challengeId}/users`)}
            size='sm'
            max={2}
          >
            {participants.map(({ id, name, image }) => (
              <WrapItem key={id}>
                <Avatar
                  size='sm'
                  fontWeight={600}
                  name={name}
                  src={getBase64Image(image?.file)}
                />
              </WrapItem>
            ))}
          </AvatarGroup>
          <S.Button
            isParticipant={isParticipant}
            onClick={() => handleParticipantAction(currentChallenge.id)}
            disabled={isLoading}
          >
            {isParticipant
              ? <LuUserX />
              : <LuUserPlus />
            }
            <span>
              {isParticipant
                ? t('pages.challenge_information.unsubmit.label')
                : t('pages.challenge_information.submit.label')}
            </span>
          </S.Button>
        </S.JoinChallengeArea>
      </S.Details>
    </S.Container>
  );
}
