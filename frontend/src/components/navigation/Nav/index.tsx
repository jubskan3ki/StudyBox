import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import blueCroixIcon from '~/assets/icons/blueCroixIcon.svg';
import dashboardIcon from '~/assets/icons/dashboardIcon.svg';
import eventsIcon from '~/assets/icons/eventsIcon.svg';
import hamburgerMenuIcon from '~/assets/icons/hamburgerIcon.svg';
import organizationIcon from '~/assets/icons/organizationIcon.svg';
import profilDefaultIcon from '~/assets/icons/profilDefaultIcon.svg';
import userIcon from '~/assets/icons/userIcon.svg';
import Logo from '~/components/common/logo';
import Breadcrumb from '~/components/navigation/Breadcrumb';
import NavItem from '~/components/navigation/NavItem';
import { hasAllAdminPermission } from '~/config/permissions';
import type { RootState } from '~/store';

const MobileNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const profileImage = useSelector((state: RootState) => state.user.photoProfil);

    const navigate = useNavigate();

    // Récupérer le rôle pour la gestion des permissions
    const role = useSelector((state: RootState) => state.auth.role);
    const canAccessOrganisation = hasAllAdminPermission(role);

    // Gestion de l'ouverture/fermeture du menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfileClick = () => {
        navigate('/profil');
    };

    return (
        <div className="relative">
            {/* TopBar mobile */}
            <div className="flex justify-between items-center p-4 bg-white fixed top-0 left-0 right-0 shadow-md z-50">
                {/* Breadcrumb à gauche */}
                <Breadcrumb />

                {/* Conteneur pour les icônes de menu et de profil */}
                <div className="flex items-center space-x-4">
                    {/* Icône du menu hamburger */}
                    <button onClick={toggleMenu}>
                        <div className="flex items-center p-2 bg-lightBlue rounded-lg ">
                            <img src={hamburgerMenuIcon} alt="Menu" className="w-6 h-6" />
                        </div>
                    </button>

                    {/* Icône de profil */}
                    <img
                        src={profileImage || profilDefaultIcon}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                        onClick={handleProfileClick}
                        onError={(e) => {
                            // Remplace l'image échouée par une image par défaut
                            (e.target as HTMLImageElement).src = profilDefaultIcon;
                        }}
                    />
                </div>
            </div>

            {/* SideMenu mobile */}
            <div
                className={`fixed inset-0 bg-white z-30 transition-transform duration-300 transform ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4 flex justify-between items-center">
                    <div className="h-8 pt-1">
                        <Logo className="object-contain" variant="StudiBoxMobile" />
                    </div>{' '}
                    <button onClick={toggleMenu}>
                        <div className="flex items-center p-2 bg-lightBlue rounded-lg ">
                            <img src={blueCroixIcon} alt="Menu" className="w-6 h-6" />
                        </div>
                    </button>
                </div>

                {/* Contenu de la SideBar dans la version mobile */}
                <ul className="mt-10 space-y-4 mx-6">
                    <NavItem
                        icon={dashboardIcon}
                        activeIcon={dashboardIcon}
                        label="Dashboard"
                        to="/"
                        isCollapsed={false}
                        onClick={toggleMenu} // Ajout du gestionnaire pour fermer le menu
                    />
                    <NavItem
                        icon={eventsIcon}
                        activeIcon={dashboardIcon}
                        label="Evènements"
                        to="/events"
                        isCollapsed={false}
                        onClick={toggleMenu} // Ajout du gestionnaire pour fermer le menu
                    />
                    {canAccessOrganisation && (
                        <NavItem
                            icon={organizationIcon}
                            activeIcon={dashboardIcon}
                            label="Organisation"
                            to="/organisation"
                            isCollapsed={false}
                            onClick={toggleMenu} // Ajout du gestionnaire pour fermer le menu
                        />
                    )}
                    <NavItem
                        icon={userIcon}
                        activeIcon={dashboardIcon}
                        label="Utilisateur"
                        to="/*"
                        isCollapsed={false}
                        onClick={toggleMenu} // Ajout du gestionnaire pour fermer le menu
                    />
                </ul>
            </div>
        </div>
    );
};

export default MobileNavigation;
