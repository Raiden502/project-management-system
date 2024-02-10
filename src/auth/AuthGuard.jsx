import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { paths } from 'src/routes/path.jsx';
import { AuthContext } from './JwtContext.jsx';
import { useRouter } from '../routes/hook/useRouter.js';

function AuthGuard({ children }) {
    const router = useRouter();
    const { pathname } = useLocation();
    const { IsAuthenticated, IsInitialized } = useContext(AuthContext);

    console.log("auth guard",  IsAuthenticated, IsInitialized,pathname)

    if (IsInitialized) {
        return <>Loading</>;
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
