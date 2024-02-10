import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';

function DepartmentsCreate() {
    return (
        <>
            <Helmet>
                <title> Dashboard: DepartmentsCreate</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="DepartmentsCreate"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'DepartmentsCreate',
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                DepartmentsCreate
            </Container>
        </>
    );
}
export default DepartmentsCreate;
