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
                    heading="Create"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Department',
                            href: paths.dashboard.departments.root,
                        },
                        {
                            name: 'Create',
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
