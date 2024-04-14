import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Stack } from '@mui/material';

import MainLayout from './Main';
import Header from './header/Header';
import NavVertical from 'src/layouts/dashboard/navigation/NavVertical';

function DashBoardLayout() {
    return (
        <>
            <Stack direction="row">
                <NavVertical />
                <Box sx={{ width: '100%', height: '100%' }}>
                    <Header />
                    <MainLayout>
                        <Outlet />
                    </MainLayout>
                </Box>
            </Stack>
        </>
    );
}

export default DashBoardLayout;
