// ProfilPopup.tsx
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import disconnectIcon from '~/assets/icons/disconnect-icon.svg';
import defaultImageUrl from '~/assets/icons/profilDefaultIcon.svg';
import updateIcon from '~/assets/icons/update-icon.svg';
import ButtonWithIcon from '~/components/common/buttons/ButtonWithIcon';
import SpanMedium from '~/components/common/typographys/SpanMedium';
import type { RootState } from '~/store';
import { logout } from '~/store/slices/auth.slice';
import type { UserMenuProps } from '~/types/components/navigation/userMenu.interface';

const UserMenu = ({ onClose }: UserMenuProps) => {
    const profileImage = useSelector((state: RootState) => state.user.photoProfil);
    const email = useSelector((state: RootState) => state.user.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="p-6 rounded-xl inline-flex flex-col items-center justify-center bg-white shadow-md min-w-[300px]">
            <div className="flex flex-col items-center justify-center gap-2 mb-5">
                <img
                    src={profileImage || defaultImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                />
                <SpanMedium className="text-center">{email}</SpanMedium>
            </div>
            <div className="h-px bg-black w-full mb-5" />
            <div className="flex bg-white rounded-lg w-full">
                <div className="flex flex-col gap-3 w-full">
                    <ButtonWithIcon
                        icon={updateIcon}
                        text="Modifier le profil"
                        onClick={() => {
                            navigate('/profil');
                            onClose(); // Fermer le popup
                        }}
                    />
                    <ButtonWithIcon
                        icon={disconnectIcon}
                        text="Déconnexion"
                        onClick={() => {
                            dispatch(logout()); // Appel de la fonction logout
                            navigate('/'); // Redirection vers la page d'accueil
                            onClose(); // Fermer le popup
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
