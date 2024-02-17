import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import ProjectCreateView from 'src/sections/project/project-create-view';

function ProjectsCreate() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Create Project</title>
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
                            name: 'Projects',
                            href: paths.dashboard.projects.root,
                        },
                        {
                            name: 'create',
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <ProjectCreateView />
            </Container>
        </>
    );
}
export default ProjectsCreate;
