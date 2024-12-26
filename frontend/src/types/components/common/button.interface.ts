export interface AddButtonProps {
    navigateTo: string; // URL vers laquelle rediriger
}

export interface ButtonWithIconProps {
    icon: string; // URL de l'icône
    text: string; // Texte à afficher sur le bouton
    onClick?: () => void; // Fonction de rappel pour le clic
    className?: string; // Optionnel : classes CSS supplémentaires si besoin
}

export interface PrimaryButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset'; // Type de bouton
    isLoading?: boolean; // État de chargement
    onClick?: () => void; // Gestionnaire de clic
    className?: string; // Classes personnalisées
    disabled?: boolean; // Propriété pour désactiver le bouton
}

export interface PrimaryButtonOutlineProps {
    label: string; // Texte du bouton
    type?: 'button' | 'submit' | 'reset'; // Type de bouton
    onClick: () => void; // Fonction appelée lors du clic sur le bouton
    className?: string; // Optionnel : classes CSS supplémentaires si besoin
    disabled?: boolean; // Optionnel : état désactivé
    isLoading?: boolean; // État de chargement
}

export interface SaveButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SecondaryButtonOutlineProps {
    label: string; // Texte du bouton
    type?: 'button' | 'submit' | 'reset'; // Type de bouton
    onClick: () => void; // Fonction appelée lors du clic sur le bouton
    className?: string; // Optionnel : classes CSS supplémentaires si besoin
    disabled?: boolean; // Optionnel : état désactivé
    isLoading?: boolean; // État de chargement
}
