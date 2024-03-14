import PropTypes from 'prop-types';
import { useContext, useEffect, useCallback } from 'react';
import { paths } from 'src/routes/path.jsx';
import { Backdrop } from '@mui/material';
import { useTheme } from '@emotion/react';
import LoadingScreen from 'src/components/loading-screen/loading-screen.js';
import { AuthContext } from './JwtContext.jsx';
import { useRouter } from '../routes/hook/useRouter.js';
import { useLocation } from 'react-router-dom';

function GuestGuard({ children }) {
    const router = useRouter();
    const theme = useTheme();
    const { pathname } = useLocation();
    const { IsAuthenticated, IsInitialized, user } = useContext(AuthContext);

    const authurl = pathname.split('/');

    if (IsInitialized) {
        return <LoadingScreen />;
    }

    if (authurl.length > 1) {
        const isVerify = authurl[1] == 'auth' && authurl[2] == 'verify';
        if (isVerify) return <>{children}</>;
    }
    
    if (IsAuthenticated) {
        const route =
            user.role === 'user' ? paths.dashboard.tasks.list : paths.dashboard.analytics.project;
        router.replace(route);
    }

    return <>{children}</>;
}

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default GuestGuard;
