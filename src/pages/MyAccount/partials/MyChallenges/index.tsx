import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import BackButton from 'components/shared/BackButton';
import { challengeStatuses, getChallengeStatus } from 'enums/challengeStatus';
import { RiEmotionSadLine } from "react-icons/ri";
import { useUserChallenges } from 'services/user';
import { getBase64Image } from 'utils';

import * as S from './styles';

const MAX_TECHS_DISPLAYED = 6;

export default function MyChallenges() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: challenges = [] } = useUserChallenges();

  const getTechsRemaining = (techs: ITechnology[]) => {
    return MAX_TECHS_DISPLAYED < techs.length
      ? techs.length - MAX_TECHS_DISPLAYED
      : 0
  };

  const hasChallenges = 0 < challenges.length;

  return (
    <S.Container>
      <S.Header>
        <BackButton path={'/account'} />
        <h2>{t('pages.account.challenges.title')}</h2>
      </S.Header>
      {!hasChallenges && (
        <S.NoChallenge>
          <RiEmotionSadLine />
          {t('pages.account.challenges.none_challenge')}
        </S.NoChallenge>
      )}
      <S.Legend>
        {Object.values(challengeStatuses).map(({ id, label, color }) => (
          <div key={id}>
            <div style={{ backgroundColor: color }}></div>
            <span>{label}</span>
          </div>
        ))}
      </S.Legend>
      <S.Challenges>
        {challenges.map(({ id, title, status, image, technologies }) => {
          const techs = technologies.slice(0, MAX_TECHS_DISPLAYED);
          const techsRemaining = getTechsRemaining(technologies);
          const challengeStatus = getChallengeStatus(status);

          return (
            <Card
              title={challengeStatus?.label}
              className='my-challenges-card'
              key={id}
              maxW='sm'
            >
              <CardBody>
                <Image
                  src={getBase64Image(image?.file) || 'https://picsum.photos/1280/720'}
                  alt={title}
                  borderRadius='md'
                />
                <Heading mt={'6'} size='md'>{title}</Heading>                  
                <Stack
                  direction={'row'}
                  mt='3'
                  spacing='1'
                >
                  {techs.map(({ id, name, color }) => (
                    <Badge
                      colorScheme='purple'
                      style={{ color: color }}
                      key={id}
                    >
                      {name}
                    </Badge>
                  ))}
                  {techsRemaining && (
                    <Badge>+{techsRemaining}</Badge>
                  )}
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter
                className='my-challenges-card-footer'
                style={{ borderColor: challengeStatus?.color }}
              >
                <Stack
                  width={'100%'}
                  direction={'row'}
                  alignItems={'center'}
                  spacing='3'
                  display={'flex'}
                >
                  <Button
                    width={'100%'}
                    onClick={() => navigate(`/challenges/${id}`)}
                    variant='solid'
                    colorScheme='purple'
                  >
                    {t('pages.challenges.see_challenge')}
                  </Button>
                </Stack>
              </CardFooter>
            </Card>            
          )
        })}
      </S.Challenges>
    </S.Container>
  );
}
