import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AnalyticsView from 'src/sections/dashboard-analytics/analytics-view';

export default function ProjectAnalytics() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Chats</title>
            </Helmet>
            <Container maxWidth={false}>
                <AnalyticsView />
            </Container>
        </>
    );
}
