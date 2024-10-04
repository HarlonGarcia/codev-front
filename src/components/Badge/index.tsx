import { PropsWithChildren } from 'react';

import * as S from './styles';

interface BadgeProps {
  border?: 'animated' | 'hidden' | 'green' | 'purple';
}

export const Badge = ({
  children,
  border = 'hidden',
  ...props
}: PropsWithChildren<BadgeProps>) => {
  return (
    <S.Container border={border} {...props}>
      {children}
    </S.Container>
  );
};