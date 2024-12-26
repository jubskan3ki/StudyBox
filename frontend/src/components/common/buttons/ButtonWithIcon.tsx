import SpanMedium from '~/components/common/typographys/SpanMedium';
import type { ButtonWithIconProps } from '~/types/components/common/button.interface';

const ButtonWithIcon = ({ icon, text, onClick, className }: ButtonWithIconProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick(); // Appeler la fonction de rappel si elle existe
        }
    };

    return (
        <div
            className={`px-4 py-2 bg-whiteBlack rounded-xl flex items-center cursor-pointer ${className}`}
            onClick={handleClick}
        >
            <img src={icon} alt={`${text} icon`} className="mr-2" />
            <SpanMedium>{text}</SpanMedium>
        </div>
    );
};

export default ButtonWithIcon;
