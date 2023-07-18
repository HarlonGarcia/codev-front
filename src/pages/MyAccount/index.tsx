import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';

import { UserOption, options } from '../../utils/userOptions';
import * as S from './styles';

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
  const navigate = useNavigate();

  const handleActions = (item: UserOption) => {
    if (item.action) item.action();
    if (item.redirectUrl) {
      navigate(item.redirectUrl);
    }
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
          {options.map((option) => (
            <S.Option key={option.label} onClick={() => handleActions(option)}>
              {option.icon}
              <span>{option.label}</span>
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
          <button>Logout</button>
        </S.AccountFooter>
      </div>
    </S.Container>
  );
}
