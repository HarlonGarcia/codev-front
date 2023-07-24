import { ButtonHTMLAttributes, ElementType } from 'react';

import * as S from './styles';

interface InputActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
  onClick: () => void;
}

export default function InputAction({ icon: Icon, ...rest }: InputActionProps) {
  return (
    <S.Action {...rest}>
      <Icon />
    </S.Action>
  );
}
