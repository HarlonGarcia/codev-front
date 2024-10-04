import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarProps, WrapItem } from '@chakra-ui/react';
import { AuthContext } from 'contexts/AuthContext';
import { getBase64Image } from 'utils';

import * as S from './styles';


type UserAvatarProps = AvatarProps & {
  redirect?: boolean;
};

export default function UserAvatar({
  size ='sm',
  fontWeight = 600,
  redirect = false,
  ...otherProps
}: UserAvatarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (!redirect) {
      return;
    }

    navigate('/account');
  }

  if (!user) {
    return;
  }
  return (
    <S.Container>
      <WrapItem onClick={handleClick}>
        <Avatar
          {...otherProps}
          size={size}
          fontWeight={fontWeight}
          name={user?.name}
          src={getBase64Image(user?.image?.file)}
        />
      </WrapItem>
      {redirect && (
        <S.Popover>
          <span>{user.name}</span>
          <button>{t('components.navbar.logout')}</button>
        </S.Popover>
      )}
    </S.Container>
  );
}
