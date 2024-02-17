import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import TeamCreateView from 'src/sections/teams/team-create-view';

function TeamsCreate() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Create Teams</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Create"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Teams',
                            href: paths.dashboard.teams.root,
                        },
                        {
                            name: 'create',
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <TeamCreateView />
            </Container>
        </>
    );
}
export default TeamsCreate;
