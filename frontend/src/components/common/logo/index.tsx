import iconWithText from '~/assets/logo/iconWithText.svg';
import StudiBoxMobile from '~/assets/logo/StudiBoxMobile.svg';
import textOnly from '~/assets/logo/textOnly.svg';
import textSB from '~/assets/logo/textSB.svg';
import type { LogoProps } from '~/types/components/common/logo.interface';

const Logo = function ({ variant, className = '' }: LogoProps) {
    const renderLogo = () => {
        const imgClass = 'object-contain h-12 max-h-12'; // Classe Tailwind pour l'image

        switch (variant) {
            case 'iconWithText':
                return <img src={iconWithText} alt="Logo avec icon" />;
            case 'textOnly':
                return <img src={textOnly} alt="Logo StudiBox text" />;
            case 'StudiBoxMobile':
                return <img src={StudiBoxMobile} alt="Icon StudiBox" />;
            case 'textSB':
                return <img src={textSB} alt="Icon StudiBox" />;
            case 'largeIconWithText':
                return <img src={iconWithText} alt="Large logo" />;
            case 'largeIconWithTextDesktop':
                return <img src={iconWithText} alt="Large logo" className={imgClass} />;
            default:
                return null;
        }
    };

    return <div className={className}>{renderLogo()}</div>;
};

export default Logo;
