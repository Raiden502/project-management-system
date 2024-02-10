// useSocket.js
import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/auth/JwtContext';

const useCallSocket = () => {
    const { user } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_DEV_VIDEO_SOCKET_API, {
            auth: { clientID: user?.user_id },
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user?.user_id]);

    return socket;
};


const useChatSocket = () => {
    const { user } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_DEV_SOCKET_API, {
            auth: { clientID: user?.user_id },
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user?.user_id]);

    return socket;
};
export {useCallSocket, useChatSocket};
