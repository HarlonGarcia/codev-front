import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';
import { MdExpandMore } from 'react-icons/md';

import * as S from './styles';
import { User } from '../../types/User';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const toggleLinksMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <S.Root>
      <div>
        <S.Avatar src={'https://picsum.photos/200'} alt={user.name} />
        <S.Content>
          <strong>{user.name}</strong>
          <S.Labels>
            {[ 1, 2 ].map(
              (label) => <li key={label}>{'Challenger'}</li>
            )}
          </S.Labels>
        </S.Content>
      </div>
      <S.Links>
        <button onClick={toggleLinksMenu}>
          <MdExpandMore />
        </button>
        {isMenuOpen ? (
          <S.MenuContext>
            {user.githubUrl && (
              <a href="">
                <FaGithub />
              </a>
            )}
            {user.githubUrl && (
              <a href="">
                <ImLink />
              </a>
            )}
          </S.MenuContext>
        ) : null}
      </S.Links>
    </S.Root>
  );
}
