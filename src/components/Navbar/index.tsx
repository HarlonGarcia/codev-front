import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Menu from 'components/Menu';
import { AuthContext } from 'contexts/AuthContext';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { IoLanguage } from "react-icons/io5";
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { MdLeaderboard   } from "react-icons/md";

import UserAvatar from './partials/UserAvatar';
import * as S from './styles';

export default function Navbar() {
  const { t } = useTranslation();
  const { logout, isAuthenticated, isAdmin } = useContext(AuthContext);

  const changeLanguage = (value: string) => {
    dayjs.locale(value);
    i18next.changeLanguage(value);
  };

  const handleLanguageChange = () => {
    const currentLanguage = i18next.resolvedLanguage;
    
    if ('en' === currentLanguage) {
      changeLanguage('pt-BR');
      return;
    }

    changeLanguage('en');
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
          {isAuthenticated && isAdmin && (
            <Link to='/dashboard'>
              <MdLeaderboard   />
              <span>{t('components.navbar.dashboard')}</span>
            </Link>
          )}
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
        </S.NavItems>

        <S.LanguageToggle
          onClick={handleLanguageChange}
          title={t('global.translation.change')}
        >
          <IoLanguage />
        </S.LanguageToggle>

        {isAuthenticated && (
          <UserAvatar redirect />
        )}
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
