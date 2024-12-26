import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfilFormComponent from '~/components/ui/form/ProfileFormComponent';

import EventPage from './Event/EventPage';

const TargetOrganisationPage = () => {
    const location = useLocation();
    const { targetId } = location.state || {}; // Récupérer targetId depuis le state passé via navigate

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            label: 'Détails',
            component: <ProfilFormComponent targetId={targetId} />,
        },
        {
            label: 'Événements',
            component: <EventPage targetId={targetId} />, // targetId est optionnel
        },
    ];

    return (
        <div className="px-8">
            {/* Barre d'onglets */}
            <div className="overflow-x-auto">
                <div className="flex items-center whitespace-nowrap">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`text-lg pb-2 font-helvetica px-4 transition-all duration-300 ${
                                index === activeTab ? 'font-bold text-primary border-b-2 border-primary' : 'text-black'
                            }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenu de l'onglet actif */}
            <div className="mt-8">{tabs[activeTab].component}</div>
        </div>
    );
};

export default TargetOrganisationPage;
