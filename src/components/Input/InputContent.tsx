import { InputHTMLAttributes } from 'react';

import * as S from './styles';

export default function InputRoot({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <S.Content {...rest} />
  );
}
