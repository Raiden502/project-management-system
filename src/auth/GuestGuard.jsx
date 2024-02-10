import PropTypes from 'prop-types';
import { useContext, useEffect, useCallback } from 'react';
import { paths } from 'src/routes/path.jsx';
import { AuthContext } from './JwtContext.jsx';
import { useRouter } from '../routes/hook/useRouter.js';

function GuestGuard({ children }) {
    const router = useRouter();
    const { IsAuthenticated, IsInitialized } = useContext(AuthContext);
    console.log("guest guard",IsAuthenticated, IsInitialized)

    // const check = useCallback(() => {
       
    // }, [IsAuthenticated, router, IsInitialized]);

    // useEffect(() => {
    //     check();
    // }, [check]);

    if (IsInitialized) {
        return <>Loading</>;
    }
    if (IsAuthenticated) {
        router.replace(paths.dashboard.root);
    }

    return <>{children}</>;
}

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default GuestGuard;
