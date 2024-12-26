import checkCircle from '~/assets/icons/check-circle.svg';
import type { SaveButtonProps } from '~/types/components/common/button.interface';

const SaveButton = ({ onClick }: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="rounded-xl bg-lightGreen text-white w-16 h-16 flex items-center justify-center backdrop-blur-lg bg-opacity-80"
        >
            <img src={checkCircle} alt="Save" />
        </button>
    );
};

export default SaveButton;
