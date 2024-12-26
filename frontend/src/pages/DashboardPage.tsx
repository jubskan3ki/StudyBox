// LoginPage.tsx
import Container from '~/components/common/container';
import EventStatsComponentDash from '~/components/ui/form/EventStatsComponent';
import { useIsMobile } from '~/hooks/useMediaQuery';
const DashboardPage = () => {
    const isMobile = useIsMobile();
    return (
        <div className={` ${isMobile ? 'px-8' : ''}`}>
            <Container variant="two-input-row">
                <EventStatsComponentDash />
            </Container>
        </div>
    );
};
export default DashboardPage;
