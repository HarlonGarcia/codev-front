import { PropsWithChildren } from 'react';

import * as S from './styles';

interface BadgeProps {
  bordered?: boolean;
}

export const Badge = ({
  children,
  bordered = true,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  return (
    <S.Container bordered={bordered} {...props}>
      {children}
    </S.Container>
  );
};