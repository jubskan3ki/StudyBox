import React from 'react';
import type { MultiValue } from 'react-select';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import type { InputFieldMultiSelectProps } from '~/types/components/common/input.interface';

const animatedComponents = makeAnimated();

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        height: '3.5rem',
        borderColor: '#a0aec0',
        boxShadow: 'none',
        borderRadius: '0.75rem',
        '&:hover': {
            borderColor: '#3182ce',
        },
        '@media (max-width: 768px)': {
            minHeight: 'auto',
        },
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: '#E7EEF8',
        display: 'flex',
        flexWrap: 'wrap', // Allow wrapping on mobile
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: '#0F52BA',
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        '@media (max-width: 768px)': {
            fontSize: '12px', // Adjust font size on mobile
        },
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: '#7BA0D9',
        ':hover': {
            backgroundColor: '#edf2f7',
            color: '#e53e3e',
        },
    }),
};

const InputFieldMultiSelect: React.FC<InputFieldMultiSelectProps> = ({
    label,
    value,
    options,
    onChange,
    isEditable = true,
}) => {
    // Adapter handleChange pour accepter le type MultiValue
    const handleChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
        // Convertir MultiValue en un tableau mutable si nécessaire
        const convertedOptions = selectedOptions.map((option) => ({
            value: option.value,
            label: option.label,
        }));
        onChange(convertedOptions);
    };

    return (
        <div className="flex flex-col relative flex-1">
            <label className="mb-3 font-medium text-left text-lightBlack">{label}</label>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isDisabled={!isEditable}
                isMulti
                options={options}
                value={value}
                onChange={handleChange} // Utiliser la fonction handleChange corrigée
                placeholder="Veuillez sélectionner..."
                classNamePrefix="react-select"
                styles={customStyles}
            />
        </div>
    );
};

export default InputFieldMultiSelect;
