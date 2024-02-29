import { Box, Stack, IconButton, Drawer, Avatar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { useTheme } from '@emotion/react';
import NavSectionVertical from 'src/components/nav-section/nav-section-vertical.js';
import { useNavData } from './ConfigNavigation.jsx';
import Logo from 'src/assets/logo.png'
import Image from 'src/components/image/image.js';
import { AuthContext } from 'src/auth/JwtContext.jsx';

const NAVDashboard = 260;

function NavVertical() {
    const navData = useNavData();
    const { theme } = useTheme()
    const {user} = useContext(AuthContext)
    const renderContent = (
        <Box
            sx={{
                height: '100%',
                backgroundColor: 'transparent',
                position: 'relative',
                overflowY: 'hidden', // Initially hide the scrollbar
                '&:hover': {
                    overflowY: 'auto', // Show the scrollbar on hover
                },
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#D5CECC',
                    borderRadius: '4px',
                    height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    // backgroundColor: '#f0f0f0',
                },
            }}
        >
            <NavSectionVertical
                data={navData}
                config={{
                    currentRole: user.role,
                }}
            />
        </Box>
    );
    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAVDashboard },
                mr: 2,
            }}
        >
            <Drawer
                open
                variant="permanent"
                PaperProps={{
                    sx: {
                        zIndex: 0,
                        width: NAVDashboard,
                        bgcolor: 'transparent',
                        borderRightStyle: 'dashed',
                    },
                }}
            >
                <Stack sx={{ alignItems:'center', p:3}} gap={3}>
                    <Avatar src={user.avatar} alt='Priya' sx={{width:42, height:42}} />
                    <Typography variant='subtitle1'>{user.user_name}</Typography>
                </Stack>
                {renderContent}
            </Drawer>
        </Box>
    );
}

export default NavVertical;
