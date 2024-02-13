import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, IconButton, Stack } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { ThemesContext } from 'src/providers/themes/ThemeProvider.jsx';
// import SearchBar from './Search';
// import ThemeChanger from './Theme.jsx';
import { HEADER, NAV } from './config';

export default function Header() {
    const { theme } = useContext(ThemesContext);
    return (
        <Box sx={{ position: 'sticky', top: 0, zIndex: 2, mb: 2 }}>
            <AppBar
                position="static"
                sx={{ bgcolor: 'transparent', boxShadow: 'none', backdropFilter: 'blur(7px)' }}
            >
                <Toolbar>
                    <IconButton onClick={() => {}}>
                        <Iconify icon="ic:round-search" />
                    </IconButton>
                    <Stack
                        flexGrow={1}
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={{ xs: 0.5, sm: 1 }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
                        />
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
