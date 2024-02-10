import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';

function ProjectDetails() {
    return (
        <>
            <Helmet>
                <title> Dashboard: ProjectDetails</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="ProjectDetails"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'ProjectDetails',
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                ProjectDetails
            </Container>
        </>
    );
}
export default ProjectDetails;
