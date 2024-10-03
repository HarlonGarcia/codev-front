import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Badge } from 'components/Badge';
import { AuthContext } from 'contexts/AuthContext';
import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';
import { getUrlWithoutPrefix } from 'services/utils';

import * as S from './styles';
import { IUserOption, options } from './utils';

export default function MyAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleActions = ({ action, redirectUrl }: IUserOption) => {
    if (action) {
      action();
    }

    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  const links = useMemo(() => {
    if (!user) {
      return [];
    }

    const { additionalUrl, githubUrl } = user;

    const items = [{
      url: getUrlWithoutPrefix(githubUrl),
      icon: <FaGithub />,
    }]

    if (additionalUrl) {
      items.push({
        url: getUrlWithoutPrefix(additionalUrl),
        icon: <ImLink />,
      });
    }

    return items;
  }, [user]);

  if (!user) {
    return;
  }
  return (
    <S.Container>
      <div>
        <S.AccountHeader>
          <S.Avatar src='https://picsum.photos/200' />
          <S.AccountInfo>
            <h2>{user.name}</h2>
            <div>
              {user.labels.map(({ id, title }) => (
                <Badge key={id}>{title}</Badge>
              ))}
            </div>
          </S.AccountInfo>
        </S.AccountHeader>
        <S.AccountContent>
          {options.map((option, index) => (
            <S.Option key={index} onClick={() => handleActions(option)}>
              {option.icon}
              {option.label}
            </S.Option>
          ))}
          <S.Divider />
          {links.map(({ url, icon }, index) => (
            <S.Contact key={index}>
              {icon}
              <span>{url}</span>
            </S.Contact>
          ))}
        </S.AccountContent>
        <S.AccountFooter>
          <button>{t('pages.account.logout')}</button>
        </S.AccountFooter>
      </div>
    </S.Container>
  );
}
