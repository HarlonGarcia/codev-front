import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import imagePlaceholder from 'assets/images/challenge-image-placeholder.png';
import { RichText } from 'components/RichText';
import { Avatar } from 'components/shared/Avatar';
import { AvatarGroup } from 'components/shared/Avatar/AvatarGroup';
import { AuthContext } from 'contexts/AuthContext';
import dayjs from 'dayjs';
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

    const {
        data: currentChallenge,
    } = useChallenge(challengeId);

    const {
        data: participants = [],
    } = useParticipants(challengeId);

    const {
        mutate: joinChallenge,
        isPending: isJoiningChallenge,
    } = useJoinChallenge();

    const {
        mutate: unjoinChallenge,
        isPending: isUnjoiningChallenge,
    } = useUnjoinChallenge();

    const isParticipant = participants.some(({ id }) => id === user?.id);
    const isButtonDisabled = isJoiningChallenge || isUnjoiningChallenge;

    const handleParticipantAction = (id?: string) => {
        if (!id) {
            return;
        }

        if (isParticipant) {
            return unjoinChallenge(id);
        }

        joinChallenge(id);
    }

    const {
        title = t('pages.challenge_information.unknown_title'),
        description,
        author,
        image,
        technologies = [],
    } = currentChallenge || {};

    const imageSource = image?.file ? getBase64Image(image.file) : imagePlaceholder;

    if (!currentChallenge) {
        return;
    }
    return (
        <S.Container>
            <S.Header>
                <h2>{title}</h2>
                <span>
                    <strong>{t('pages.challenge_information.created_at')}</strong>
                    {dayjs(currentChallenge?.createdAt).format(DATE_TIME)}
                </span>
            </S.Header>
            <S.Cover src={imageSource} />
            <RichText
                readonly
                content={description}
            />
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
                        max={2}
                    >
                        {participants.map(({ id, name, image }) => (
                            <Avatar
                                key={id}
                                name={name}
                                url={getBase64Image(image?.file)}
                                size='sm'
                            />
                        ))}
                    </AvatarGroup>
                    <S.Button
                        isParticipant={isParticipant}
                        onClick={() => handleParticipantAction(currentChallenge?.id)}
                        disabled={isButtonDisabled}
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
