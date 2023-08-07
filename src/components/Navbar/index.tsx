import { Link } from 'react-router-dom';
import { FaCodeBranch } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import * as S from './styles';
import Menu from '../Menu';

export default function Navbar() {
  const { t } = useTranslation('translation', { keyPrefix: 'components.navbar' });

  return (
    <S.Container>
      <h3>Codev</h3>
      <S.Navigation>
        <Link to='/'>
          <AiFillHome />
          <span>{t('home')}</span>
        </Link>
        <Link to='/challenges'>
          <FaCodeBranch />
          <span>{t('challenges')}</span>
        </Link>
      </S.Navigation>
      <Menu />
    </S.Container>
  );
}
