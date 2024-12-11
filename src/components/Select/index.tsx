import { ChangeEvent, ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { NONE } from 'utils/constants';

import './styles.scss';

interface SelectProps extends ComponentProps<'select'> {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    deselectable?: boolean;
    error?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    options: {
        label: string;
        value: string;
        disabled?: boolean;
    }[];
}

export const Select = ({
    id,
    deselectable = false,
    error,
    placeholder,
    label,
    options,
    value,
    onChange,
    ...rest
}: SelectProps) => {
    const { t } = useTranslation();

    return (
        <div className='co-select'>
            {label && (
                <label className='mb-2 text-green-800 sm:text-lg' htmlFor={id}>{label}</label>
            )}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className='co-select-input'
                {...rest}
            >
                <option value={NONE} defaultValue={NONE} disabled={deselectable}>
                    {placeholder || t('global.select.placeholder')}
                </option>
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
            {error && (
                <span className='mt-2 font-sm text-red-500'>{error}</span>
            )}
        </div>
    );
};