import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import DepartmentListView from 'src/sections/departments/department-list-view';

function DepartmentsLists() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Departments List</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Departments"
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
                            name: 'List',
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <DepartmentListView />
            </Container>
        </>
    );
}
export default DepartmentsLists;
