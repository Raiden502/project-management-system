import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import UserListView from 'src/sections/users/user-list-view';
import UserTabsView from 'src/sections/users/user-tabs-view';

function UsersLists() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Users</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Users"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Users',
                            href: paths.dashboard.users.list,
                        },
                        {
                            name: 'List',
                        },
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <UserTabsView />
            </Container>
        </>
    );
}
export default UsersLists;
