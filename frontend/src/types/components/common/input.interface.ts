export interface InputFieldProps {
    type: 'text' | 'password' | 'email' | 'number';
    label: string;
    value: string | number;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    hasIcon?: boolean;
    onChange: (value: string | number) => void;
    isEditable?: boolean;
    multiline?: boolean;
    rows?: number;
    isRequired?: boolean;
}

export interface InputFieldListProps {
    label: string;
    value: string | number;
    options: { value: string | number; label: string }[]; // Liste d'options
    onChange: (value: string | number) => void;
    isEditable?: boolean; // Par défaut, le champ est éditable
}

export interface InputFieldMultiSelectProps {
    label: string;
    value: { value: string; label: string }[]; // Valeurs sélectionnées
    options: { value: string; label: string }[]; // Liste d'options
    onChange: (selectedValues: { value: string; label: string }[]) => void; // Gestionnaire de changement
    isEditable?: boolean; // Champ éditable par défaut
}

export interface FileInputProps {
    id: string;
    label: string;
    name?: string;
    icon?: React.ComponentType<{ className?: string }>;
    accept?: string;
    required?: boolean;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputRangeProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    value: number;
    onChange: (value: number) => void;
}
