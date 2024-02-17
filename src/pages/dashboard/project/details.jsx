import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import ProjectDetailsView from 'src/sections/project/project-details-view';

function ProjectDetails() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Project Details</title>
            </Helmet>
            <Container maxWidth={false}>
                <ProjectDetailsView />
            </Container>
        </>
    );
}
export default ProjectDetails;
