import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaCodeBranch } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { MdSpaceDashboard, MdViewSidebar } from 'react-icons/md';

import * as S from './styles';
import Menu from '../Menu';
import { AppDispatch } from '../../store';
import { toggleSidebar } from '../../store/features/sidebarSlice';

export default function Navbar() {
  const { t } = useTranslation('translation', { keyPrefix: 'components.navbar' });
  const dispatch = useDispatch<AppDispatch>();
  const isUserAtuhenticated = useIsAuthenticated();
  const location = useLocation();

  const [ isSidebarVisible, setIsSidebarVisible ] = useState(false);

  useEffect(() => {
    const regex = /^\/dashboard/;
    const isDashboardPath = regex.test(location.pathname);

    setIsSidebarVisible(isDashboardPath);
  }, [location]);

  const toggleSidebarView = () => dispatch(toggleSidebar());

  return (
    <S.Container>
      <S.Main>
        {isSidebarVisible && (
          <button onClick={toggleSidebarView}>
            <MdViewSidebar />
          </button>
        )}
        <h3>Codev</h3>
      </S.Main>
      <S.Navigation>
        <Link to='/'>
          <AiFillHome />
          <span>{t('home')}</span>
        </Link>
        <Link to='/challenges'>
          <FaCodeBranch />
          <span>{t('challenges')}</span>
        </Link>
        {!isUserAtuhenticated() && (
          <Link to='/signin'>
            <FiLogIn />
            <span>{t('signin')}</span>
          </Link>
        )}
        <Link to='/dashboard'>
          <MdSpaceDashboard />
          <span>{t('dashboard')}</span>
        </Link>
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
