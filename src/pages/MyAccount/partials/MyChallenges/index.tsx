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
  Tag,
} from '@chakra-ui/react';
import BackButton from 'components/shared/BackButton';
import { GrStatusCriticalSmall } from 'react-icons/gr';
import { RiEmotionSadLine } from "react-icons/ri";
import { useUserChallenges } from 'services/user';
import { challengeStatuses, getBase64Image } from 'utils';

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
      <S.Challenges>
        {challenges.map(({ id, title, status, image, technologies }) => {
          const techs = technologies.slice(0, MAX_TECHS_DISPLAYED);
          const techsRemaining = getTechsRemaining(technologies);

          return (
            <Card key={id} maxW='sm'>
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
              <CardFooter>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing='3'
                >
                  <Button
                    minW={'2xs'}
                    onClick={() => navigate(`/challenges/${id}`)}
                    variant='solid'
                    colorScheme='purple'
                  >
                    {t('pages.challenges.see_challenge')}
                  </Button>
                  <Tag
                    size={'lg'}
                    variant='subtle'
                    height={'100%'}
                    fontSize={'1.5rem'}
                    style={{ color: challengeStatuses[status].color }}
                    colorScheme='purple'
                  >
                    <GrStatusCriticalSmall />
                  </Tag>
                </Stack>
              </CardFooter>
            </Card>            
          )
        })}
      </S.Challenges>
    </S.Container>
  );
}
