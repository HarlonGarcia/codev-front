import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';

import * as S from './styles';

export default function Avatar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    return;
  }

  return (
    <S.Container>
      <S.Avatar onClick={() => navigate('/account')}>
        <img
          src={'https://avatar.iran.liara.run/public/46'}
          alt={user.name}
        />
      </S.Avatar>
      <S.Popover>
        <span>{user.name}</span>
        <button>Fazer logout</button>
      </S.Popover>
    </S.Container>
  );
}
