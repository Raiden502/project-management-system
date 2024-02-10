import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';

function DepartmentsDetails() {
    return (
        <>
            <Helmet>
                <title> Dashboard: DepartmentsDetails</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="DepartmentsDetails"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'DepartmentsDetails',
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                DepartmentsDetails
            </Container>
        </>
    );
}
export default DepartmentsDetails;
