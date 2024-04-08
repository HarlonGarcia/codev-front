import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import Menu from '../Menu';
import * as S from './styles';

export default function Navbar() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'components.navbar',
  });

  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    window.location.reload();
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
        {isAuthenticated && (
          <>
            <Link to='/challenges'>
              <FaCodeBranch />
              <span>{t('challenges')}</span>
            </Link>
            <button onClick={handleLogout}>
              <LuLogOut />
              <span>{t('logout')}</span>
            </button>
          </>
        )}
        {!isAuthenticated && (
          <Link to='/signin'>
            <LuLogIn />
            <span>{t('signin')}</span>
          </Link>
        )}
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
