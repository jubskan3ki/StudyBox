import { useNavigate } from 'react-router-dom';
import greenPlusCircle from '~/assets/icons/green-plus-circle.svg';
import type { AddButtonProps } from '~/types/components/common/button.interface';

const AddButton = ({ navigateTo }: AddButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigateTo); // Rediriger vers l'URL passée en props
    };

    return (
        <button
            onClick={handleClick}
            className="rounded-xl bg-lightGreen text-white w-16 h-16 flex items-center justify-center backdrop-blur-lg bg-opacity-80"
        >
            <img src={greenPlusCircle} alt="Save" />
        </button>
    );
};

export default AddButton;
