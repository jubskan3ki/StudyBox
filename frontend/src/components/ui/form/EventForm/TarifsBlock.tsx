import { useEffect } from 'react';
import priceIcon from '~/assets/icons/currency-euro.svg';
import Trash from '~/assets/icons/trash.svg';
import PrimaryButtonOutline from '~/components/common/buttons/PrimaryButtonOutline';
import Container from '~/components/common/container';
import InputField from '~/components/common/inputs/InputField';
import H3 from '~/components/common/typographys/H3';
import IconTitle from '~/components/common/typographys/IconTitle';
import type { EventTarif } from '~/types/api/event/EventTypes';

interface TarifsBlockProps {
    tarifs: EventTarif[];
    updateField: (tarifs: EventTarif[]) => void;
}
const TarifsBlock = ({ tarifs, updateField }: TarifsBlockProps) => {
    useEffect(() => {
        if (tarifs.length === 0) {
            updateField([
                { title: 'Étudiant', price: 0, stock: 0, description: '' },
                { title: 'Normal', price: 0, stock: 0, description: '' },
            ]);
        }
    }, [tarifs.length, updateField]);

    const addTarif = () => {
        updateField([...tarifs, { title: '', price: 0, stock: 0, description: '' }]);
    };

    const updateTarif = (
        index: number,
        field: keyof EventTarif, // Utilisation de keyof EventTarif pour la sécurité des types
        value: string | number
    ) => {
        const newTarifs = [...tarifs];

        // Empêcher la modification du titre des deux premiers tarifs
        if (field === 'title' && (index === 0 || index === 1)) {
            return; // Ne pas permettre de modifier les titres des deux premiers tarifs
        }

        newTarifs[index] = { ...newTarifs[index], [field]: value };
        updateField(newTarifs);
    };

    const removeTarif = (index: number) => {
        if (index > 1) {
            // Empêcher la suppression des deux premiers tarifs (Étudiant et Normal)
            const newTarifs = tarifs.filter((_, i) => i !== index);
            updateField(newTarifs);
        }
    };

    return (
        <div className="mb-8">
            <IconTitle title="Tarifs" image={priceIcon} className="mb-6" />
            {tarifs.map((tarif, index) => (
                <div key={index} className="mb-4 bg-lightBlue p-8 rounded-lg">
                    <div className="flex justify-between">
                        <H3 className="text-primary">
                            {index === 0 ? 'Tarif Étudiant' : index === 1 ? 'Tarif Normal' : `Tarif ${index + 1}`}
                        </H3>
                        {index > 1 && ( // Afficher la corbeille seulement pour les tarifs autres que les deux premiers
                            <img
                                src={Trash}
                                alt="trash-icon"
                                className="cursor-pointer"
                                onMouseEnter={(e) => (e.currentTarget.src = Trash)}
                                onMouseLeave={(e) => (e.currentTarget.src = Trash)}
                                onClick={() => removeTarif(index)}
                            />
                        )}
                    </div>
                    <InputField
                        type="text"
                        label="Titre"
                        value={tarif.title}
                        onChange={(value) => updateTarif(index, 'title', value)}
                        size="small"
                        isEditable={index > 1} // Utiliser isEditable pour empêcher l'édition des titres des deux premiers tarifs
                    />
                    <Container variant="two-input-row">
                        <InputField
                            type="number"
                            label="Prix"
                            value={tarif.price}
                            onChange={(value) => updateTarif(index, 'price', Number(value))}
                            size="small"
                        />
                        <InputField
                            type="number"
                            label="Stock"
                            value={tarif.stock}
                            onChange={(value) => updateTarif(index, 'stock', Number(value))}
                            size="small"
                        />
                    </Container>
                    <InputField
                        type="text"
                        label="Description"
                        value={tarif.description}
                        onChange={(value) => updateTarif(index, 'description', value)}
                        size="small"
                    />
                </div>
            ))}
            <PrimaryButtonOutline label="Ajouter un tarif" onClick={addTarif} />
        </div>
    );
};

export default TarifsBlock;
