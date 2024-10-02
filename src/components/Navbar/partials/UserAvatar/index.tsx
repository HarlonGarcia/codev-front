import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, WrapItem } from '@chakra-ui/react';
import { AuthContext } from 'contexts/AuthContext';
import { getBase64Image } from 'utils';

import * as S from './styles';

export default function UserAvatar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    return;
  }
  return (
    <S.Container>
      <WrapItem onClick={() => navigate('/account')}>
        <Avatar
          size='sm'
          fontWeight={600}
          name={user?.name}
          src={getBase64Image(user?.image?.file)}
        />
      </WrapItem>
      <S.Popover>
        <span>{user.name}</span>
        <button>Fazer logout</button>
      </S.Popover>
    </S.Container>
  );
}
