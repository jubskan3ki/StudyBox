import { useState } from 'react';
import EventFormComponent from '~/components/ui/form/EventForm/EventFormComponent';
import EventStatsComponent from '~/components/ui/form/EventStatsComponent';

interface TargetEventPageProps {
    event_id: number; // ID de l'événement passé en props
}

const TargetEventPage = ({ event_id }: TargetEventPageProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            label: 'Détails',
            component: <EventFormComponent targetEventId={event_id} isUpdate={true} />,
        },
        {
            label: 'Statistiques',
            component: <EventStatsComponent />,
        },
    ];

    return (
        <div className="w-full">
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

export default TargetEventPage;
