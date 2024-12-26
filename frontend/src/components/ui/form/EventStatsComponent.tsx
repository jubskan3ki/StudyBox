// export default EventStatsComponent;
import GenderPaymentChart from '~/components/chart/GenderPaymentChart';
import SoldTickets from '~/components/chart/SoldTickets';
import StatInfoBox from '~/components/chart/StatInfoBox';

const EventStatsComponentDash = () => {
    const statInfoData = [
        { title: 'Étudiant', value: 23, percentage: 10 },
        { title: 'Externe', value: 57, percentage: 50 },
        { title: 'Âge moyen', value: 48, percentage: 48 },
    ];

    return (
        <>
            <div className="mb-8 flex gap-6">
                {/* <SalesStatsComponent /> */}
                <GenderPaymentChart />
                <SoldTickets stockPercentage={25} soldTickets={10000} totalRevenue={100000} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {statInfoData.map((info, index) => (
                    <StatInfoBox key={index} title={info.title} value={info.value} percentage={info.percentage} />
                ))}
            </div>

            <div className="mb-8 flex gap-6">{/* <PersonInterested /> */}</div>
        </>
    );
};

export default EventStatsComponentDash;
