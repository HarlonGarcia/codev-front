import { useIsAuthenticated } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCodeBranch } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';

import * as S from './styles';
import Menu from '../Menu';

export default function Navbar() {
  const { t } = useTranslation('translation', { keyPrefix: 'components.navbar' });
  const isAuthenticated = useIsAuthenticated();

  return (
    <S.Container>
      <h3>Codev</h3>
      <S.Navigation>
        <Link to='/'>
          <AiFillHome />
          <span>{t('home')}</span>
        </Link>
        {isAuthenticated() && (
          <Link to='/challenges'>
            <FaCodeBranch />
            <span>{t('challenges')}</span>
          </Link>
        )}
        {!isAuthenticated() && (
          <Link to='/signin'>
            <FiLogIn />
            <span>{t('signin')}</span>
          </Link>
        )}
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
