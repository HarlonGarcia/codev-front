import {
  ReactNode,
  SelectHTMLAttributes,
  forwardRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import { NONE } from 'utils/constants';

import * as S from './styles';

type DefaultSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
>;

interface SelectOption {
  key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: JSX.Element | string;
}

type SelectProps = DefaultSelectProps & {
  label?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold';
  default?: SelectOption;
  options: SelectOption[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const {
      label,
      error,
      size = 'sm',
      weight = 'normal',
      options,
      default: defaultOption,
      ...rest
    } = props;

    const { t } = useTranslation();

    return (
      <S.Wrapper size={size} weight={weight}>
        {label && (
          <label htmlFor={rest.id}>
            {label}
          </label>
        )}

        <S.ContentArea ref={ref} {...rest}>
          {!defaultOption && (
            <S.Option
              style={{ display: 'none' }}
              value={NONE}
            >
              {t('global.select.placeholder')}
            </S.Option>
          )}

          {defaultOption && (
            <S.Option
              style={{ display: 'none' }}
              value={defaultOption.value}
            >
              {defaultOption.label}
            </S.Option>
          )}

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