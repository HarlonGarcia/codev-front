import { Link } from 'react-router-dom';
import { FaCodeBranch } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

import * as S from './styles';
import Menu from '../Menu';

export default function Navbar() {
  return (
    <S.Container>
      <h3>Codev</h3>
      <S.Navigation>
        <Link to='/'>
          <AiFillHome />
          <span>Home</span>
        </Link>
        <Link to='/challenges'>
          <FaCodeBranch />
          <span>Challenges</span>
        </Link>
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
