import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import TeamListView from 'src/sections/teams/team-list-view';

function TeamsLists() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Teamss</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Teams"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Teams',
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <TeamListView />
            </Container>
        </>
    );
}
export default TeamsLists;
