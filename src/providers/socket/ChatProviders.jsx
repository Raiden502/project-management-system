import React, {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useContext,
    useState,
    useRef,
} from 'react';
import MuiAlert from '@mui/material/Alert';
import { Socket, io } from 'socket.io-client';
import { AuthContext } from 'src/auth/JwtContext';
import { Avatar, Box, Snackbar, SnackbarContent, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify/Iconify';
import { useLocation } from 'react-router-dom';

const IntialReducerState = {
    currentChatUser: {},
    chats: [],
    chatUsers: [],
};

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEFAULT_USERS':
            return { ...state, chatUsers: action.payload };

        case 'SET_DEFAULT_CHATS':
            return { ...state, chats: action.payload };

        case 'SET_DEFAULT_CURRENTUSR':
            return { ...state, currentChatUser: action.payload };

        case 'LAST_MESSAGE':
            const receivedLastMsg = action.payload;
            const temp_data = state.chatUsers.map((item) => {
                if (item.id === receivedLastMsg.userId) {
                    return { ...item, lastmsg: receivedLastMsg.message };
                }
                return item;
            });
            return { ...state, chatUsers: temp_data };

        case 'NEW_MESSAGE':
            const receivedMessage = action.payload;
            return {
                ...state,
                chats: [
                    ...state.chats,
                    {
                        message: receivedMessage.message,
                        datetime: receivedMessage.date,
                        senderid: receivedMessage.userId,
                        reciverid: receivedMessage.recipientID,
                        username: receivedMessage?.username,
                        avatar: receivedMessage?.avatar,
                    },
                ],
            };

        case 'ONLINE_STATUS':
            const receivedOnlineStatus = action.payload;
            const temp_usr_online = state.chatUsers.map((item) => {
                if (item.id === receivedOnlineStatus.recipientID) {
                    return { ...item, onlinestatus: receivedOnlineStatus.onlinestatus };
                }
                return item;
            });
            if (state.currentChatUser?.id === receivedOnlineStatus.recipientID) {
                return {
                    ...state,
                    chatUsers: temp_usr_online,
                    currentChatUser: {
                        ...state.currentChatUser,
                        onlinestatus: receivedOnlineStatus.onlinestatus,
                    },
                };
            }
            return {
                ...state,
                chatUsers: temp_usr_online,
            };

        default:
            console.log('no condition found');
            break;
    }
    return state;
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ChatContext = createContext(null);

ChatContext.propTypes = {
    children: PropTypes.node,
};

export function ChatProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [connected, setConnected] = useState(false);
    const IoInstance = useRef(null);
    const [chatState, ChatDispatch] = useReducer(Reducer, IntialReducerState);
    const [notify, setNotify] = React.useState({ open: false, message: {} });
    const { pathname } = useLocation();

    const NotificationChat = (receivedMessage) => {
        setNotify({ open: true, message: receivedMessage });
    };

    const SendMessage = (value) => {
        if (value != '') {
            IoInstance.current.emit('private message', {
                recipientID: chatState.currentChatUser?.id,
                orgId: user.org_id,
                message: value,
                userId: user.user_id,
                type: chatState.currentChatUser?.type,
                username: user.user_name,
                avatar: user.avatar,
            });
            ChatDispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: value,
                    date: new Date().toLocaleString(),
                    userId: user.user_id,
                    recipientID: chatState.currentChatUser.id,
                    username: 'you',
                    avatar: user.avatar,
                },
            });
            ChatDispatch({
                type: 'LAST_MESSAGE',
                payload: {
                    message: value,
                },
            });
        }
    };

    const privateMessageListener = (receivedMessage) => {
        if (
            chatState.currentChatUser.id == undefined ||
            pathname !== '/dashboard/communication/chat'
        ) {
            NotificationChat(receivedMessage);
        }
        ChatDispatch({ type: 'LAST_MESSAGE', payload: receivedMessage });
        if (receivedMessage.userId == chatState.currentChatUser.id) {
            ChatDispatch({ type: 'NEW_MESSAGE', payload: receivedMessage });
        } else {
            NotificationChat(receivedMessage);
        }
    };

    const onlineStatusListener = (receivedMessage) => {
        ChatDispatch({ type: 'ONLINE_STATUS', payload: receivedMessage });
    };

    useEffect(() => {
        if (!IoInstance.current && user?.user_id) {
            IoInstance.current = io(process.env.REACT_APP_DEV_SOCKET_API, {
                auth: { clientID: user?.user_id },
                reconnectionDelay: 1000,
                reconnection: true,
                reconnectionAttempts: Infinity,
                agent: false,
                upgrade: false,
                rejectUnauthorized: false,
            });
            IoInstance.current.on('connect', () => {
                console.log('Chat socket connected');
                setConnected(true);
            });

            IoInstance.current.on('disconnect', (reason) => {
                console.log('Char socket disconnected:', reason);
                setConnected(false);
            });
            return () => {
                // Cleanup: Remove the old listeners when the component unmounts or when IoInstance.current changes.
                IoInstance.current.off('connect');
                IoInstance.current.off('disconnect');
            };
        }
    }, [user?.user_id]);

    useEffect(() => {
        if (IoInstance.current) {
            IoInstance.current.on('private message', privateMessageListener);
            IoInstance.current.on('online-status', onlineStatusListener);
            return () => {
                // Cleanup: Remove the old listeners when the component unmounts or when IoInstance.current changes.
                IoInstance.current.off('private message', privateMessageListener);
                IoInstance.current.off('online-status', onlineStatusListener);
            };
        }
    }, [chatState.currentChatUser.id, pathname]);

    const memoizedValue = useMemo(
        () => ({
            SendMessage,
            NotificationChat,
            currentChatUser: chatState.currentChatUser,
            chats: chatState.chats,
            chatUsers: chatState.chatUsers,
            ChatDispatch,
        }),
        [chatState.currentChatUser, chatState.chats, chatState.chatUsers]
    );
    return (
        <ChatContext.Provider value={memoizedValue}>
            {children}
            <Snackbar
                open={notify.open}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => setNotify({ open: false, message: {} })}
            >
                <SnackbarContent
                    style={{ backgroundColor: '#2196f3' }}
                    message={
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={notify.message.avatar} alt={notify.message.username} />
                            <Box style={{ marginLeft: '10px' }}>
                                <Typography variant="subtitle1" style={{ color: 'white' }}>
                                    {notify.message.username}
                                </Typography>
                                <Typography variant="body1" style={{ color: 'white' }}>
                                    {notify.message.message}
                                </Typography>
                            </Box>
                        </Box>
                    }
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setNotify((prev) => ({ ...prev, open: false }))}
                        >
                            <Iconify icon="mingcute:close-fill" />
                        </IconButton>
                    }
                />
            </Snackbar>
        </ChatContext.Provider>
    );
}
