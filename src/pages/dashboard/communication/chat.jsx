import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/path';
import ChattingView from 'src/sections/chat/chat-view';

function UserChatting() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Chats</title>
            </Helmet>
            <Container maxWidth={false}>
                <CustomBreadcrumbs
                    heading="Chats"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        }
                    ]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <ChattingView />
            </Container>
        </>
    );
}
export default UserChatting;
