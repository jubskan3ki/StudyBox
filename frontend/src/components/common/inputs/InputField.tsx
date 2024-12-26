import { useState } from 'react';
import eyeSlash from '~/assets/icons/eye-slash.svg';
import type { InputFieldProps } from '~/types/components/common/input.interface';

const sizeClasses = {
    small: 'mb-5 h-14 md:mb-6 lg:mb-7',
    medium: 'mb-4 ',
    large: 'pb-5 flex-1 h-10 md:mb-6 lg:mb-6',
};

function InputField({
    type,
    label,
    value,
    placeholder,
    size = 'medium',
    hasIcon = false,
    onChange,
    isEditable = true,
    multiline = false,
    rows = 6,
    isRequired = false,
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
        onChange(newValue);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col relative flex-1">
            <label className="mb-3 font-medium text-left text-lightBlack">{label}</label>
            <div className="relative">
                {multiline ? (
                    <textarea
                        value={value as string}
                        placeholder={placeholder}
                        onChange={handleChange}
                        rows={rows}
                        className={`border border-lightGray hover:border-[#3182ce] rounded-xl w-full px-4 ${sizeClasses[size]}`}
                        disabled={!isEditable}
                    />
                ) : (
                    <input
                        type={type === 'password' && showPassword ? 'text' : type}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        className={`border border-lightGray rounded-xl w-full px-4 ${
                            hasIcon && type === 'password' ? 'pr-12' : ''
                        } ${sizeClasses[size]}`}
                        disabled={!isEditable}
                        required={isRequired}
                    />
                )}
                {hasIcon && type === 'password' && (
                    <div
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 top-[-16px] right-3 flex items-center cursor-pointer text-gray-600"
                    >
                        <img src={eyeSlash} alt="Toggle password visibility" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputField;
