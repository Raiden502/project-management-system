import React, {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useContext,
    useState,
} from 'react';
import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Modal,
    Snackbar,
    Stack,
    Typography,
} from '@mui/material';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamIcon from '@mui/icons-material/Videocam';
import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
import { AuthContext } from 'src/auth/JwtContext';
import PropTypes from 'prop-types';
import AudioCallView from 'src/sections/video/AudioCallView';
import { useCallSocket } from 'src/utils/socket';
import Iconify from 'src/components/iconify/Iconify';

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
    const localSocketState = localStorage.getItem('Socket-State');
    const IoInstance = useCallSocket();
    const [callState, CallDispatch] = useReducer(
        Reducer,
        localSocketState ? JSON.parse(localSocketState) : IntialReducerState
    );

    const requestCall = (receiverInfo, type) => {
        console.log(receiverInfo, 'requestcall');
        IoInstance.emit('newcalls', {
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
        IoInstance.emit('accepincoming', {
            userInfo: callState.userInfo,
            accept: true,
            receiverInfo: callState.receiverInfo,
        });
        CallDispatch({ type: 'SET_ACCEPT' });
        if (callState.type === 'video') {
            window.open(`/dashboard/communication/meet`, '_blank');
        }
        if (callState.type === 'groupvideo') {
            window.open(`/dashboard/communication/groupmeet`, '_blank');
        }
    };

    const rejectIncomingCall = () => {
        console.log(callState, 'reject');
        IoInstance.emit('accepincoming', {
            userInfo: callState.userInfo,
            accept: false,
            receiverInfo: callState.receiverInfo,
        });
        // CallDispatch({ type: 'SET_DECLINE' });
        CallDispatch({ type: 'SET_LEAVE' });
    };

    const newCallListener = (receivedMessage) => {
        const { receiverInfo, userInfo, type } = receivedMessage;
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
            if (callState.type === 'video') {
                window.open(`/dashboard/communication/meet`, '_blank');
            }
            if (callState.type === 'groupvideo') {
                window.open(`/dashboard/communication/groupmeet`, '_blank');
            }
        } else {
            CallDispatch({ type: 'SET_DECLINE' });
        }
    };

    useEffect(() => {
        localStorage.setItem('Socket-State', JSON.stringify(callState));
        if (IoInstance) {
            if (IoInstance.connected === false) {
                IoInstance.on('connect', () => {
                    console.log('connnect video');
                });
            }
            IoInstance.on('newcalls', newCallListener);
            IoInstance.on('accepincoming', acceptIncomingListener);
            return () => {
                // Cleanup: Remove the old listeners when the component unmounts or when IoInstance changes.
                IoInstance.off('newcalls', newCallListener);
                IoInstance.off('accepincoming', acceptIncomingListener);
            };
        }
    }, [IoInstance, callState]);

    const memoizedValue = useMemo(
        () => ({
            rejectIncomingCall,
            acceptIncomingCall,
            requestCall,
            CallDispatch,
            incomingCall: callState,
        }),
        [IoInstance, callState.receiverId, callState.accept, callState.incoming, callState.type]
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
        </CallContext.Provider>
    );
}
