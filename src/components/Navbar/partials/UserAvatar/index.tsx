import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { getBase64Image } from 'utils';

import * as S from './styles';


type UserAvatarProps = {
  redirect?: boolean;
  hidePopover?: boolean;
};

export default function UserAvatar({
    redirect = false,
    hidePopover = false,
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
            <S.Button onClick={handleClick}>
                <img
                    {...otherProps}
                    src={getBase64Image(user?.image?.file)}
                />
            </S.Button>
            {redirect && !hidePopover && (
                <S.Popover>
                    <span>{user.name}</span>
                    <button>{t('components.navbar.logout')}</button>
                </S.Popover>
            )}
        </S.Container>
    );
}
