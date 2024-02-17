import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import TeamDetailsView from 'src/sections/teams/team-detail-view';

function TeamsDetails() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Team Details</title>
            </Helmet>
            <Container maxWidth={false}>
                <TeamDetailsView />
            </Container>
        </>
    );
}
export default TeamsDetails;
