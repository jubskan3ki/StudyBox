export interface SwitchProps {
    label: string;
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
