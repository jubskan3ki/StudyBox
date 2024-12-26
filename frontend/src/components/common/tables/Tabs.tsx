import { useState } from 'react';
import type { User } from '~/types/table/userTable.interface';

interface TabsProps {
    data: User[];
    headers: string[];
    onRowClick: (user: User) => void;
}

const Tabs = ({ data, headers, onRowClick }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (user: User) => {
        onRowClick(user); // Passer l'utilisateur sélectionné à la fonction
    };

    return (
        <div className="w-full">
            {/* Exemple d'onglets (ajustez selon votre cas d'utilisation) */}
            <div className="overflow-x-auto">
                <div className="flex items-center whitespace-nowrap">
                    {['Onglet 1', 'Onglet 2'].map((label, index) => (
                        <button
                            key={index}
                            className={`text-lg pb-2 font-helvetica px-4 transition-all duration-300 ${
                                index === activeTab ? 'font-bold text-primary border-b-2 border-primary' : 'text-black'
                            }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Affichage du tableau pour l'onglet actif */}
            <div className="mt-8">
                {activeTab === 0 && (
                    <table className="w-full">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} className="border px-4 py-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr
                                    key={user.id}
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleClick(user)}
                                >
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Tabs;
