import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import DepartmentDetailsView from 'src/sections/departments/department-details-view';

function DepartmentsDetails() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Department Details</title>
            </Helmet>
            <Container maxWidth={false}>
                <DepartmentDetailsView />
            </Container>
        </>
    );
}
export default DepartmentsDetails;
