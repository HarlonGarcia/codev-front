import {
  ReactNode,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';

import * as S from './styles';

type DefaultTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
>;

type TextAreaProps = DefaultTextAreaProps & {
  label?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold';
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(props, ref)  {
    const {
      label,
      error,
      size = 'sm',
      weight = 'normal',
      ...rest
    } = props;

    return (
      <S.Wrapper size={size} weight={weight}>
        {label && (
          <label htmlFor={rest.id}>
            {label}
          </label>
        )}

        <S.ContentArea ref={ref} {...rest} />

        {error && (
          <span>{error}</span>
        )}
      </S.Wrapper>
    );
  },
);