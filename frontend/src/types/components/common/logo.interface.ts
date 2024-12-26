export interface LogoProps {
    variant:
        | 'iconWithText'
        | 'textOnly'
        | 'StudiBoxMobile'
        | 'largeIconWithText'
        | 'largeIconWithTextDesktop'
        | 'textSB';
    className?: string; // Propriété pour les classes CSS supplémentaires
}
