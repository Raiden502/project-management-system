// useSocket.js
import { io } from 'socket.io-client';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from 'src/auth/JwtContext';

const useCallSocket = () => {
    const { user } = useContext(AuthContext);
    const socket = useRef(null);
    useEffect(() => {
        if (socket.current) return;
        if (user?.user_id) {
            socket.current = io(process.env.REACT_APP_DEV_VIDEO_SOCKET_API, {
                auth: { clientID: user?.user_id },
            });
        }
    }, [user?.user_id]);

    return socket;
};

const useChatSocket = () => {
    const { user } = useContext(AuthContext);
    const socket = useRef(null);
    useEffect(() => {
        if (socket.current) return;
        if (user?.user_id) {
            socket.current = io(process.env.REACT_APP_DEV_SOCKET_API, {
                auth: { clientID: user.user_id },
            });
        }
    }, [user?.user_id]);

    return socket;
};
export { useCallSocket, useChatSocket };
