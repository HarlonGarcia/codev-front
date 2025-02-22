import { ChangeEvent, ComponentProps, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { NONE } from 'utils/constants';

import './styles.scss';

interface SelectProps extends ComponentProps<'select'> {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    canDeselect?: boolean;
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    function Select(props, ref) {
        const {
            id,
            canDeselect = false,
            error,
            placeholder,
            label,
            options,
            value,
            onChange,
            ...rest
        } = props;

        const { t } = useTranslation();

        return (
            <div className='co-select'>
                {label && (
                    <label className='mb-2 text-green-800 sm:text-lg' htmlFor={id}>{label}</label>
                )}
                <select
                    ref={ref}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className='co-select-input'
                    {...rest}
                >
                    <option
                        value={NONE}
                        defaultValue={NONE}
                        disabled={!canDeselect}
                        className={canDeselect ? 'cursor-pointer' : 'cursor-not-allowed'}
                    >
                        {placeholder || t('global.select.placeholder')}
                    </option>
                    {options.map(({ label, value, disabled }) => (
                        <option
                            key={value}
                            value={value}
                            disabled={disabled}
                            className='cursor-pointer'
                        >
                            {label}
                        </option>
                    ))}
                </select>
                {error && (
                    <span className='mt-2 text-red-500 font-sm'>{error}</span>
                )}
            </div>
        );
    }
);