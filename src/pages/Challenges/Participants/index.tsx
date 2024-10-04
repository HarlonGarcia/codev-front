import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Avatar,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  WrapItem,
} from '@chakra-ui/react';
import { Badge } from 'components/Badge';
import { UserLink } from 'components/shared/UserLink';
import PageNotFound from 'pages/PageNotFound';
import { MdArrowBackIosNew } from "react-icons/md";
import { useParticipants } from 'services/challenge';
import { getBase64Image } from 'utils';

import * as S from './styles';

export default function Participants() {
  const { t } = useTranslation();
  const { id: challengeId } = useParams();
  const navigate = useNavigate();

  const { data: participants = [] } = useParticipants(challengeId);

  if (!participants || 0 >= participants.length) {
    return <PageNotFound />;
  };
  return (
    <S.Container>
      <button onClick={() => navigate(`/challenges/${challengeId}`)}>
        <MdArrowBackIosNew />
        <span>{t('pages.challenge_users.button.return')}</span>
      </button>
      <TableContainer>
        <Table colorScheme='whiteAlpha' variant='striped'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>{t('pages.challenge_users.table.columns.name')}</Th>
              <Th>{t('pages.challenge_users.table.columns.github')}</Th>
              <Th>Link adicional</Th>
              <Th>{t('pages.challenge_users.table.columns.labels')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participants.map(({
              id,
              name,
              image,
              githubUrl,
              additionalUrl,
              labels,
            }) => (
              <Tr key={id}>
                <Td>
                  <WrapItem>
                    <Avatar
                      size='sm'
                      fontWeight={600}
                      name={name}
                      src={getBase64Image(image?.file)}
                    />
                  </WrapItem>
                </Td>
                <Td>{name}</Td>
                <Td>
                  <UserLink href={githubUrl} spacing prettify />
                </Td>
                <Td>
                  <UserLink href={additionalUrl} spacing prettify />
                </Td>
                <Td>
                  <Flex wrap={'wrap'} gap={2}>
                    {labels?.slice(0, 3).map(({ id, title }) => (
                      <Badge border='green' key={id}>
                        {title}
                      </Badge>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </S.Container>
  );
}