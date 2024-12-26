import type { ChangeEvent } from 'react';

export type SelectProps = {
    id: string;
    label?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options?: Array<{ label: string; value: string }>;
    name: string;
    value: string | string[];
    selectClasses?: string;
    icon?: React.ComponentType<{ className?: string }>;
    error?: string;
};
