import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/path';
import ProjectListView from 'src/sections/project/project-list-view';

function ProjectLists() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Projects</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Projects"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Projects',
                            href: paths.dashboard.projects.root,
                        },
                        {
                            name: 'list',
                        },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.projects.create}
                            variant="contained"
                            sx={{
                                bgcolor: '#212B36',
                                color: 'white',
                                textDecoration: 'none',
                                textTransform: 'none',
                            }}
                            startIcon={<Iconify icon="mingcute:add-line" />}
                        >
                            New Project
                        </Button>
                    }
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <ProjectListView />
            </Container>
        </>
    );
}
export default ProjectLists;
