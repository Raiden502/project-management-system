import React, {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useRef,
    useMemo,
    useContext,
    useState,
} from 'react';
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
// useSocket.js
import { Socket, io } from 'socket.io-client';
import PropTypes from 'prop-types';

import { AuthContext } from 'src/auth/JwtContext';
import AudioCallView from 'src/sections/video/AudioCallView';
// import { useCallSocket } from 'src/utils/socket';
import Iconify from 'src/components/iconify/Iconify';
import RenderVideoCallComponent from 'src/pages/dashboard/communication/RenderVideoCall';

const IntialReducerState = {
    accept: false,
    incoming: false,
    outgoing: false,
    userInfo: {
        name: '',
        avatar: '',
        id: '',
    },
    receiverInfo: {
        name: '',
        avatar: '',
        id: '',
    },
    groups: [],
    sessionState: false,
    type: '',
};

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INCOMMING': {
            const { type, receiverInfo, userInfo } = action.payload;
            return {
                ...state,
                type: type,
                incoming: true,
                receiverInfo: receiverInfo,
                userInfo: userInfo,
            };
        }
        case 'SET_ACCEPT':
            return {
                ...state,
                incoming: false,
                accept: true,
                outgoing: false,
            };
        case 'SET_DECLINE':
            return {
                ...state,
                incoming: false,
                accept: false,
                outgoing: false,
            };
        case 'SET_LEAVE':
            return {
                ...IntialReducerState,
            };
        case 'SET_NEWCALL': {
            const { type, receiverInfo, userInfo } = action.payload;
            return {
                ...state,
                type: type,
                receiverInfo: receiverInfo,
                userInfo: userInfo,
                outgoing: true,
            };
        }
        default:
            console.log('no condition found');
            break;
    }
    return state;
};

export const CallContext = createContext(null);

CallContext.propTypes = {
    children: PropTypes.node,
};

export function CallProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [connected, setConnected] = useState(false);
    const IoInstance = useRef(null);
    const [callState, CallDispatch] = useReducer(Reducer, IntialReducerState);

    const requestCall = (receiverInfo, type) => {
        console.log(user, 'requestcall');
        IoInstance.current.emit('newcalls', {
            receiverInfo: receiverInfo,
            userInfo: {
                name: user.user_name,
                avatar: user.avatar,
                id: user.user_id,
            },
            type: type,
        });
        CallDispatch({
            type: 'SET_NEWCALL',
            payload: {
                receiverInfo: receiverInfo,
                userInfo: {
                    name: user.user_name,
                    avatar: user.avatar,
                    id: user.user_id,
                },
                type: type,
            },
        });
    };

    const acceptIncomingCall = () => {
        console.log(callState, 'acceptcall');
        IoInstance.current.emit('accepincoming', {
            userInfo: callState.userInfo,
            accept: true,
            receiverInfo: callState.receiverInfo,
        });
        CallDispatch({ type: 'SET_ACCEPT' });
    };

    const rejectIncomingCall = () => {
        console.log(callState, 'reject');
        IoInstance.current.emit('accepincoming', {
            userInfo: callState.userInfo,
            accept: false,
            receiverInfo: callState.receiverInfo,
        });
        CallDispatch({ type: 'SET_LEAVE' });
    };

    const newCallListener = (receivedMessage) => {
        const { receiverInfo, userInfo, type } = receivedMessage;
        console.log('newcalls');
        if (callState.sessionState === false) {
            CallDispatch({
                type: 'SET_INCOMMING',
                payload: {
                    receiverInfo: userInfo,
                    userInfo: {
                        name: user.user_name,
                        avatar: user.avatar,
                        id: user.user_id,
                    },
                    type: type,
                },
            });
        }
    };

    const acceptIncomingListener = (receivedMessage) => {
        const { accept, userInfo, receiverInfo } = receivedMessage;
        console.log('accepting', accept);
        if (accept === true) {
            CallDispatch({ type: 'SET_ACCEPT' });
        } else {
            CallDispatch({ type: 'SET_DECLINE' });
        }
    };

    useEffect(() => {
        if (!IoInstance.current && user?.user_id) {
            IoInstance.current = io(process.env.REACT_APP_DEV_VIDEO_SOCKET_API, {
                auth: { clientID: user?.user_id },
                reconnectionDelay: 1000,
                reconnection: true,
                reconnectionAttempts: Infinity,
                agent: false,
                upgrade: false,
                rejectUnauthorized: false,
            });

            IoInstance.current.on('connect', () => {
                console.log('Video socket connected');
                setConnected(true);
            });

            IoInstance.current.on('disconnect', (reason) => {
                console.log('Video socket disconnected:', reason);
                setConnected(false);
            });

            IoInstance.current.on('newcalls', newCallListener);
            IoInstance.current.on('accepincoming', acceptIncomingListener);
            return () => {
                // Cleanup: Remove the old listeners when the component unmounts or when IoInstance.current changes.
                IoInstance.current.off('connect');
                IoInstance.current.off('disconnect');
                IoInstance.current.off('newcalls', newCallListener);
                IoInstance.current.off('accepincoming', acceptIncomingListener);
            };
        }
    }, [callState.sessionState,  user?.user_id ]);

    console.log('video connection state', connected);

    const memoizedValue = useMemo(
        () => ({
            rejectIncomingCall,
            acceptIncomingCall,
            requestCall,
            CallDispatch,
            incomingCall: callState,
            IoInstance:IoInstance
        }),
        [
            IoInstance.current,
            callState.receiverId,
            callState.accept,
            callState.incoming,
            callState.type,
        ]
    );
    return (
        <CallContext.Provider value={memoizedValue}>
            {children}
            <Dialog maxWidth="xs" open={callState.incoming} onClose={() => {}}>
                <DialogTitle>{callState.type == 'phone' ? 'Audio Call' : 'Video Call'}</DialogTitle>
                <DialogContent>
                    <Stack
                        gap={3}
                        sx={{
                            p: 3,
                        }}
                    >
                        <Stack direction="column" gap={3} sx={{ alignItems: 'center' }}>
                            <Avatar
                                src={callState.receiverInfo.avatar}
                                alt="UNKOEN"
                                sx={{ width: 56, height: 56, boxShadow: 10 }}
                            />
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {callState.receiverInfo.name} Calling ...
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 'inherit',
                            }}
                        >
                            <IconButton
                                onClick={acceptIncomingCall}
                                sx={{ backgroundColor: '#212B36', color: 'green' }}
                            >
                                {callState.type === 'phone' ? (
                                    <Iconify icon="fluent:call-48-filled" />
                                ) : (
                                    <Iconify icon="fluent:chat-video-24-filled" />
                                )}
                            </IconButton>
                            <IconButton
                                onClick={rejectIncomingCall}
                                sx={{ backgroundColor: '#212B36', color: 'red' }}
                            >
                                <Iconify icon="solar:end-call-bold" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog maxWidth="xs" open={callState.outgoing} onClose={() => {}}>
                <DialogTitle>{callState.type == 'phone' ? 'Audio Call' : 'Video Call'}</DialogTitle>
                <DialogContent>
                    <Stack
                        gap={2}
                        sx={{
                            p: 3,
                        }}
                    >
                        <Stack direction="column" gap={3} sx={{ alignItems: 'center' }}>
                            <Avatar
                                src={callState.receiverInfo.avatar}
                                alt="UNKOEN"
                                sx={{ width: 56, height: 56, boxShadow: 10 }}
                            />
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Calling {callState.receiverInfo.name} ...
                            </Typography>
                            <IconButton
                                onClick={rejectIncomingCall}
                                sx={{ backgroundColor: '#212B36', color: 'red' }}
                            >
                                <Iconify icon="solar:end-call-bold" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
            {memoizedValue.incomingCall.accept && memoizedValue.incomingCall.type === 'phone' && (
                <AudioCallView />
            )}
            <RenderVideoCallComponent
                isOpen={
                    memoizedValue.incomingCall.accept && memoizedValue.incomingCall.type !== 'phone'
                }
            />
        </CallContext.Provider>
    );
}
