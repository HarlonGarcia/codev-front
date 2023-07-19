import React from 'react';

import * as S from './styles';

interface InputRootProps {
  children: React.ReactNode;
}

export default function InputRoot({ children }: InputRootProps) {
  return (
    <S.Root>{children}</S.Root>
  );
}
