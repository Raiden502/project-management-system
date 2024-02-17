import { Button, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import { RouterLink } from 'src/routes/components';
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
                            href: paths.dashboard.teams.root,
                        },
                        {
                            name: 'list',
                        },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.teams.create}
                            variant="contained"
                            sx={{ bgcolor: '#212B36', color: 'white', textDecoration: 'none', textTransform: 'none' }}
                            startIcon={<Iconify icon="mingcute:add-line" />}
                        >
                            New Team
                        </Button>
                    }
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <TeamListView />
            </Container>
        </>
    );
}
export default TeamsLists;
