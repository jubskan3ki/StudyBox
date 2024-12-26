import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import type { SelectProps } from '~/types/components/common/select.interface';

function Select({
    id,
    label,
    onChange,
    options = [],
    name,
    value,
    selectClasses = 'select',
    icon: Icon = undefined,
    error,
}: SelectProps) {
    useEffect(() => {
        if (options.length > 0 && !value && onChange) {
            const firstOption = options[0];
            onChange({
                target: {
                    name,
                    value: firstOption.value,
                },
                type: 'change',
            } as ChangeEvent<HTMLSelectElement>);
        }
    }, [options, value, name, onChange]);

    return (
        <div className="select-container">
            {label && <label htmlFor={id}>{label}</label>}
            <div className={error ? 'select-error' : ''}>
                {Icon && <Icon />}
                <select id={id} name={name} onChange={onChange} className={selectClasses} value={value}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <small className="select-error-message">{error}</small>}
        </div>
    );
}

export default Select;
