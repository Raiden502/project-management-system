import React, {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useContext,
} from 'react';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from 'src/auth/JwtContext';
import { Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import { useChatSocket} from 'src/utils/socket';


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
    const IoInstance = useChatSocket()
    const [chatState, ChatDispatch] = useReducer(Reducer, IntialReducerState);
    const [notify, setNotify] = React.useState({ open: false, message: {} });

    const NotificationChat = (receivedMessage) => {
        setNotify({ open: true, message: receivedMessage });
    };

    const SendMessage = (value) => {
        if (value != '') {
            IoInstance.emit('private message', {
                recipientID: chatState.currentChatUser?.id,
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

    useEffect(() => {
        if (IoInstance) {
            const privateMessageListener = (receivedMessage) => {
                console.log('Received private message:', chatState.currentChatUser.id);
                if (chatState.currentChatUser.id == undefined) {
                    console.log('currentChatUser is undefined');
                    return;
                }
                ChatDispatch({ type: 'LAST_MESSAGE', payload: receivedMessage });
                if (receivedMessage.userId == chatState.currentChatUser.id) {
                    ChatDispatch({ type: 'NEW_MESSAGE', payload: receivedMessage });
                } else {
                    console.log('notify', chatState.currentChatUser.id);
                    NotificationChat(receivedMessage);
                }
            };

            const onlineStatusListener = (receivedMessage) => {
                ChatDispatch({ type: 'ONLINE_STATUS', payload: receivedMessage });
            };

            IoInstance.on('private message', privateMessageListener);
            IoInstance.on('online-status', onlineStatusListener);
            return () => {
                // Cleanup: Remove the old listeners when the component unmounts or when IoInstance changes.
                IoInstance.off('private message', privateMessageListener);
                IoInstance.off('online-status', onlineStatusListener);
            };
        }
    }, [IoInstance, chatState.currentChatUser]);

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
                autoHideDuration={6000}
                onClose={() => setNotify({ open: false, message: {} })}
            >
                <Alert
                    onClose={() => setNotify({ open: false, message: {} })}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {notify.message.message}
                </Alert>
            </Snackbar>
        </ChatContext.Provider>
    );
}
