import { Link } from 'react-router-dom';

import * as S from './styles';

export default function Navbar() {
  return (
    <S.Container>
      <h3>Codev</h3>
      <S.Navigation>
        <Link to='/'>Home</Link>
        <Link to='/challenges'>Challenges</Link>
      </S.Navigation>
      <S.Menu></S.Menu>
    </S.Container>
  );
}
