import * as S from './styles';
import { User } from '../../types/User';
import CardPopover from './CardPopover';

import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
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
      <S.LinksPopover>
        <CardPopover 
          github={user.githubUrl}
          additional={user.additionalUrl}
        />
      </S.LinksPopover>
      <S.Contacts>
        {user.githubUrl && (
          <a href={user.githubUrl} target='_black' rel='noopener noreferrer'>
            <FaGithub />
          </a>
        )}
        {user.additionalUrl && (
          <a href={user.additionalUrl} target='_black' rel='noopener noreferrer'>
            <ImLink />
          </a>
        )}
      </S.Contacts>
    </S.Root>
  );
}
