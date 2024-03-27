import { useIsAuthenticated, useSignOut } from 'react-auth-kit';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCodeBranch } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { RiLogoutBoxRFill } from 'react-icons/ri';

import * as S from './styles';
import Menu from '../Menu';

export default function Navbar() {
  const { t } = useTranslation('translation', { keyPrefix: 'components.navbar' });
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const handleLogout = () => {
    localStorage.clear();
    signOut();
  };

  return (
    <S.Container>
      <Link to='/'>
        <h3>Codev</h3>
      </Link>
      <S.Navigation>
        <Link to='/'>
          <AiFillHome />
          <span>{t('home')}</span>
        </Link>
        {isAuthenticated() && (
          <>
            <Link to='/challenges'>
              <FaCodeBranch />
              <span>{t('challenges')}</span>
            </Link>
            <button onClick={handleLogout}>
              <RiLogoutBoxRFill />
              <span>{t('logout')}</span>
            </button>
          </>
        )}
        {!isAuthenticated() && (
          <Link to='/signin'>
            <RiLogoutBoxRFill />
            <span>{t('signin')}</span>
          </Link>
        )}
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
