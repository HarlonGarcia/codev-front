import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Avatar,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  WrapItem,
} from '@chakra-ui/react';
import PageNotFound from 'pages/PageNotFound';
import { useParticipants } from 'services/challenge';
import { getBase64Image } from 'utils';

import * as S from './styles';

export default function Participants() {
  const { id: challengeId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: participants = [] } = useParticipants(challengeId);

  if (!participants || 0 >= participants.length) {
    return (
      <PageNotFound
        placeholder={t('pages.challenge_information.page_not_found.placeholder')}
      />
    )
  };

  return (
    <S.Container>
      <button onClick={() => navigate(`/challenge/${challengeId}`)}></button>
      <TableContainer>
        <Table variant='unstyled'>
          <Thead>
            <Tr>
              <Th>Foto</Th>
              <Th>Nome</Th>
              <Th>Github</Th>
            </Tr>
          </Thead>
          <Tbody>
                
            {participants.map(({
              id,
              name,
              image,
              githubUrl,
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
                <Td>{githubUrl}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </S.Container>
  );
}