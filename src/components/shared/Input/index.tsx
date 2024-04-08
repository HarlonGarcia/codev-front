import {
  ElementType,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';

import * as S from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  error?: ReactNode;
  onIconBeforeClick?: () => void;
  onIconAfterClick?: () => void;
  iconBefore?: ElementType;
  iconAfter?: ElementType;
};

type GetIconFnParams = {
  position: 'before' | 'after';
  icon: ElementType;
  onClick?: () => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref)  {
    const {
      label,
      error,
      onIconBeforeClick,
      onIconAfterClick,
      iconBefore: IconBefore,
      iconAfter: IconAfter,
      ...rest
    } = props;

    const hasIconBefore = Boolean(IconBefore);
    const hasIconAfter = Boolean(IconAfter);

    const getIcon = ({ icon: Icon, position, onClick }: GetIconFnParams) => {
      if (!onClick) {
        return <Icon id={position} />;
      }

      return (
        <button onClick={onClick}>
          <Icon id={position} />
        </button>
      );
    };

    return (
      <S.Wrapper>
        {label && (
          <label htmlFor={rest.id}>
            {label}
          </label>
        )}
        <S.InputWrapper
          hasIconBefore={hasIconBefore}
          hasIconAfter={hasIconAfter}
        >
          {IconBefore && getIcon({
            position: 'before',
            icon: IconBefore,
            onClick: onIconBeforeClick,
          })}

          <input ref={ref} {...rest} />

          {IconAfter && getIcon({
            position: 'after',
            icon: IconAfter,
            onClick: onIconAfterClick,
          })}
        </S.InputWrapper>
        {error && (
          <span>{error}</span>
        )}
      </S.Wrapper>
    );
  },
);

export { Input };