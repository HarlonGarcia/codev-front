import {
    ElementType,
    InputHTMLAttributes,
    ReactNode,
    forwardRef,
} from 'react';

import * as S from './styles';

type DefaultInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

type InputProps = DefaultInputProps & {
  label?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold';
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input(props, ref)  {
        const {
            label,
            error,
            size = 'sm',
            weight = 'normal',
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
            <S.Wrapper size={size} weight={weight}>
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