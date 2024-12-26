import EventCard from '~/components/ui/Card/EventCard';

interface EventCardListProps {
    data: any[];
    onCardClick: (id: number) => void;
}

function EventCardList({ data, onCardClick }: EventCardListProps) {
    const handleClick = (event: any) => {
        onCardClick(event.id);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 relative mb-16">
            {data.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => handleClick(event)} />
            ))}
        </div>
    );
}

export default EventCardList;
