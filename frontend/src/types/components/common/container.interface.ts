export interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    variant?:
        | 'auth-container'
        | 'desktop-layout-container'
        | 'two-input-row'
        | 'two-input-row-1'
        | 'two-input-row-75-25'; // Ajoutez la nouvelle variante ici
}
