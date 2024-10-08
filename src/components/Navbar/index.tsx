import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Menu from 'components/Menu';
import { AuthContext } from 'contexts/AuthContext';
import i18next from 'i18next';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { IoLanguage } from "react-icons/io5";
import { LuLogIn, LuLogOut } from 'react-icons/lu';

import UserAvatar from './partials/UserAvatar';
import * as S from './styles';

export default function Navbar() {
  const { t } = useTranslation();
  const { logout, isAuthenticated } = useContext(AuthContext);

  const changeLanguage = () => {
    const currentLanguage = i18next.resolvedLanguage;
    
    if ('en' === currentLanguage) {
      i18next.changeLanguage('pt-BR');
      return;
    }

    i18next.changeLanguage('en');
  };

  return (
    <S.Container>
      <Link to='/'>
        <h3>Codev</h3>
      </Link>
      <S.Navigation>
        <S.NavItems>
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
        </S.NavItems>

        <S.LanguageToggle
          onClick={changeLanguage}
          title={t('global.translation.change')}
        >
          <IoLanguage />
        </S.LanguageToggle>

        {isAuthenticated && (
          <UserAvatar redirect />
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
