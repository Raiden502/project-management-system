import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import UsersCreateView from 'src/sections/users/user-create-view';

function UsersCreate() {
    return (
        <>
            <Helmet>
                <title> Dashboard: UsersCreate</title>
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
                            name: 'Users',
                            href: paths.dashboard.users.create,
                        },
                        {
                            name: 'Create',
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <UsersCreateView />
            </Container>
        </>
    );
}
export default UsersCreate;
