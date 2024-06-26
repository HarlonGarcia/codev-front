import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';
import { IUserOption, options } from './utils';

const links = [
  {
    icon: <FaGithub />,
    link: '/DevName',
  },
  {
    icon: <ImLink />,
    link: 'portifolio.com',
  },
];

export default function MyAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleActions = ({ action, redirectUrl }: IUserOption) => {
    action && action();
    redirectUrl && navigate(redirectUrl);
  };

  return (
    <S.Container>
      <div>
        <S.AccountHeader>
          <S.Avatar src='https://picsum.photos/200' />
          <S.AccountInfo>
            <h2>John Doe</h2>
            <div>
              {[ 'Dev Java', 'Challenger' ].map((item, index) => (
                <span key={index}>{item}</span>
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
          {links.map((contact, index) => (
            <S.Contact key={index}>
              {contact.icon}
              <span>{contact.link}</span>
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
