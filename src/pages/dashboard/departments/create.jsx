import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import DepartmentCreateView from 'src/sections/departments/department-create-view';

function DepartmentsCreate() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Department Create</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Create a new Department"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Create',
                            href: paths.dashboard.root,
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <DepartmentCreateView />
            </Container>
        </>
    );
}
export default DepartmentsCreate;
