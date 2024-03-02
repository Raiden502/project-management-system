import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { paths } from 'src/routes/path.jsx';
import { Backdrop } from '@mui/material';
import { useTheme } from '@emotion/react';
import LoadingScreen from 'src/components/loading-screen/loading-screen.js';
import { AuthContext } from './JwtContext.jsx';
import { useRouter } from '../routes/hook/useRouter.js';

function AuthGuard({ children }) {
    const router = useRouter();
    const theme = useTheme();
    const { pathname } = useLocation();
    const { IsAuthenticated, IsInitialized } = useContext(AuthContext);

    if (IsInitialized) {
        return <LoadingScreen />;
    }
    if (IsAuthenticated === false) {
        router.replace(paths.auth.login);
    }

    return <>{children}</>;
}

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default AuthGuard;
