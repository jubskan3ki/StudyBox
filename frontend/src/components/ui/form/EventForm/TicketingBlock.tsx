import cartIcon from '~/assets/icons/shopping-cart.svg';
import Container from '~/components/common/container';
import InputField from '~/components/common/inputs/InputField';
import IconTitle from '~/components/common/typographys/IconTitle';
import type { EventForm } from '~/types/api/event/EventTypes';

import ToggleButton from './ToggleButton';

interface TicketingBlockProps {
    use_studibox: boolean;
    ticketPrice: number;
    ticketStock: number;
    externalTicketingUrl: string;
    updateField: (field: keyof EventForm, value: any) => void; // Modifié pour correspondre à EventForm
}

const TicketingBlock = ({
    use_studibox,
    ticketPrice,
    ticketStock,
    externalTicketingUrl,
    updateField,
}: TicketingBlockProps) => {
    const handleInputChange = (field: keyof EventForm) => (value: string | number) => {
        updateField(field, value);
    };
    console.log(use_studibox);

    return (
        <>
            <IconTitle title="Billetterie" image={cartIcon} className="mb-6" />
            <div className="mt-6 bg-lightBlue p-8 rounded-lg mb-8">
                <ToggleButton
                    label="Utiliser la billetterie de Studibox ?"
                    value={use_studibox}
                    onChange={(val) => updateField('use_studibox', val)}
                />

                <Container variant="two-input-row" className="mt-4">
                    <InputField
                        type="text"
                        label="URL billetterie externe"
                        value={externalTicketingUrl}
                        onChange={handleInputChange('externalTicketingUrl')}
                        size="small"
                        isEditable={!use_studibox}
                    />
                </Container>

                <Container variant="two-input-row">
                    <InputField
                        type="number"
                        label="A partir de (€)"
                        value={ticketPrice}
                        onChange={handleInputChange('ticketPrice')}
                        size="small"
                        isEditable={!use_studibox}
                    />
                    <InputField
                        type="number"
                        label="Stock"
                        value={ticketStock}
                        onChange={handleInputChange('ticketStock')}
                        size="small"
                        isEditable={!use_studibox}
                    />
                </Container>
            </div>
        </>
    );
};

export default TicketingBlock;
