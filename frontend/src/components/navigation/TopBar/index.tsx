import { useState } from 'react';
import { useSelector } from 'react-redux';
import defaultImageUrl from '~/assets/png/defaultProfileImage.jpeg';
import type { RootState } from '~/store';

import Breadcrumb from '../Breadcrumb';
import ProfilPopup from '../userMenu';

interface TopBarProps {
    isCollapsed: boolean;
}

const TopBar = ({ isCollapsed }: TopBarProps) => {
    const profileImage = useSelector((state: RootState) => state.user.photoProfil);
    const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
    const closeProfilePopup = () => setProfilePopupVisible(false);

    const handleProfileClick = () => {
        setProfilePopupVisible((prev) => !prev);
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        if (event.currentTarget.src !== defaultImageUrl) {
            event.currentTarget.src = defaultImageUrl;
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-10 bg-white px-8 py-4 border-b border-lightGray flex justify-between items-center z-30 ${
                isCollapsed ? 'ml-32' : 'ml-72'
            }`}
        >
            <div className="flex-1">
                <Breadcrumb />
            </div>

            <div className="flex items-center">
                <img
                    src={profileImage || defaultImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                    onClick={handleProfileClick}
                    onError={handleImageError}
                />
            </div>

            {isProfilePopupVisible && (
                <div className="absolute right-8 top-24 z-40">
                    <ProfilPopup onClose={closeProfilePopup} />
                </div>
            )}
        </div>
    );
};

export default TopBar;
