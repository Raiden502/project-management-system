import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
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
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5,} }}
                />
                <ProjectListView />
            </Container>
        </>
    );
}
export default ProjectLists;
