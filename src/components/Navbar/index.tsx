import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { WrapItem, Avatar } from '@chakra-ui/react';
import Menu from 'components/Menu';
import { AuthContext } from 'contexts/AuthContext';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { getBase64Image } from 'utils';

import * as S from './styles';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useContext(AuthContext);

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
        {isAuthenticated && (
          <WrapItem>
            <Avatar
              size='sm'
              fontWeight={600}
              name={user?.name}
              src={getBase64Image(user?.image?.file)}
            />
          </WrapItem>
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
