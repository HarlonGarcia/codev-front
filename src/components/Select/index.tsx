import { ChangeEvent, ComponentProps } from 'react';

import './styles.scss';

interface SelectProps extends ComponentProps<'select'> {
  cannotBeEmpty?: boolean;
  placeholder: string;
  label?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}

export const Select = ({
  id,
  cannotBeEmpty = false,
  placeholder,
  label,
  options,
  value,
  onChange,
  ...rest
}: SelectProps) => {
  return (
    <div className='co-select'>
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className='co-select-input'
        {...rest}
      >
        {placeholder && (
          <option selected disabled={cannotBeEmpty}>{placeholder}</option>
        )}
        {options.map(({ label, value, disabled }) => (
          <option
            key={value}
            value={value}
            disabled={disabled}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};