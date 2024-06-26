import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { usePermissions } from '../../hooks/usePermissions';
import Menu from '../Menu';
import * as S from './styles';

export default function Navbar() {
  const { t } = useTranslation();
  const { logout, isAuthenticated } = usePermissions();

  return (
    <S.Container>
      <Link to='/'>
        <h3>Codev</h3>
      </Link>
      <S.Navigation>
        <Link to='/'>
          <AiFillHome />
          <span>{t('components.navbar.home')}</span>
        </Link>
        {isAuthenticated && (
          <>
            <Link to='/challenges'>
              <FaCodeBranch />
              <span>{t('components.navbar.challenges')}</span>
            </Link>
            <button onClick={logout}>
              <LuLogOut />
              <span>{t('components.navbar.logout')}</span>
            </button>
          </>
        )}
        {!isAuthenticated && (
          <Link to='/signin'>
            <LuLogIn />
            <span>{t('components.navbar.signin')}</span>
          </Link>
        )}
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
