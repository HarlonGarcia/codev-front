import {
  ReactNode,
  SelectHTMLAttributes,
  forwardRef,
} from 'react';

import * as S from './styles';

type DefaultSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
>;

interface SelectOption {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: JSX.Element | string;
}

type SelectProps = DefaultSelectProps & {
  label?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold';
  options: SelectOption[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref)  {
    const {
      label,
      error,
      size = 'sm',
      weight = 'normal',
      options,
      ...rest
    } = props;

    return (
      <S.Wrapper size={size} weight={weight}>
        {label && (
          <label htmlFor={rest.id}>
            {label}
          </label>
        )}

        <S.ContentArea ref={ref} {...rest}>
          {options.map(({ key, value, label }) => (
            <S.Option key={key} value={value}>
              {label}
            </S.Option>
          ))}
        </S.ContentArea>

        {error && (
          <span>{error}</span>
        )}
      </S.Wrapper>
    );
  },
);