import { Box, Stack, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import NavSectionVertical from 'src/components/nav-section/nav-section-vertical.js';
import { ThemesContext } from '../../../providers/themes/ThemeProvider.jsx';
import { useNavData } from './ConfigNavigation.jsx';

const NAVDashboard = 260;

function NavVertical() {
	const navData = useNavData();
    const { theme } = useContext(ThemesContext);
    const renderContent = (
        <Box
            sx={{
                height: '100%',
                backgroundColor: 'transparent',
                // overflowY: 'scroll',
            }}
        >
            <NavSectionVertical
                data={navData}
                config={{
                    currentRole:'admin',
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
                {renderContent}
            </Drawer>
        </Box>
    );
}

export default NavVertical;
