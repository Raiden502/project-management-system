import React, { useState, useEffect, useContext, useRef } from 'react';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { CallContext } from 'src/providers/socket/CallProviders';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
};

function AudioCallView() {
    const theme = useTheme();
    const { CallDispatch, incomingCall, IoInstance } = useContext(CallContext);
    const peerConnection = new RTCPeerConnection(servers);
    const [actions, setActions] = useState({ audio: false });
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [close, setClose] = useState(true);
    const localStreamRef = useRef(null);
    const localAudioRef = useRef(null);
    const remoteAudioRef = useRef(null);

    const muteAudioButton = () => {
        const audioTracks = localStreamRef.current.getAudioTracks();
        audioTracks.forEach((track) => {
            track.enabled = !actions.audio;
        });
        setActions({ ...actions, audio: !actions.audio });
    };

    const leaveButton = async () => {
        await localStreamRef.current.getTracks().forEach((track) => track.stop());
        peerConnection.close();
        IoInstance.current.emit('leave', {
            receiverId: incomingCall.receiverInfo.id,
            payload: null,
        });
        CallDispatch({ type: 'SET_LEAVE' });
    };
    const startCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            });

            localStreamRef.current = stream;
            localAudioRef.current.srcObject = localStreamRef.current;
            localStreamRef.current
                .getAudioTracks()
                .forEach((track) => peerConnection.addTrack(track, localStreamRef.current));

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            IoInstance.current.emit('offer', {
                payload: offer,
                receiverId: incomingCall.receiverInfo.id,
            });
        } catch (err) {
            console.error(err);
        }
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            IoInstance.current.emit('candidate', {
                payload: event.candidate,
                receiverId: incomingCall.receiverInfo.id,
            });
        }
    };

    peerConnection.onaddstream = (event) => {
        remoteAudioRef.current.srcObject = event.stream;
    };

    const offerListener = async (receivedMessage) => {
        const { payload } = receivedMessage;

        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(payload));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            IoInstance.current.emit('answer', {
                payload: answer,
                receiverId: incomingCall.receiverInfo.id,
            });
        } catch (error) {
            console.error('Error creating answer:', error);
        }
    };
    const answerListener = async (receivedMessage) => {
        const { payload } = receivedMessage;
        await peerConnection.setRemoteDescription(new RTCSessionDescription(payload));
    };
    const candidateListener = async (receivedMessage) => {
        const { payload } = receivedMessage;
        await peerConnection.addIceCandidate(new RTCIceCandidate(payload));
    };
    const leaveListner = async (receivedMessage) => {
        const { payload } = receivedMessage;
        await localStreamRef.current.getTracks().forEach((track) => track.stop());
        peerConnection.close();
        CallDispatch({ type: 'SET_LEAVE' });
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(timerInterval);
    }, []);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        if (IoInstance.current) {
            if (incomingCall.accept) {
                startCall();
            }
            IoInstance.current.on('offer', offerListener);
            IoInstance.current.on('answer', answerListener);
            IoInstance.current.on('candidate', candidateListener);
            IoInstance.current.on('leave', leaveListner);

            return () => {
                IoInstance.current.off('offer', offerListener);
                IoInstance.current.off('answer', answerListener);
                IoInstance.current.off('candidate', candidateListener);
                IoInstance.current.off('leave', leaveListner);
            };
        }
    }, [incomingCall.accept]);
    
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '100px',
                right: '20px',
                backgroundColor: '#212B36',
                p: 0.5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                borderRadius: close ? '50px' : '10px',
                width: 'auto',
                transition: 'width 2s linear 1s',
                zIndex: theme.zIndex.appBar + 1,
            }}
        >
            <audio ref={remoteAudioRef} autoPlay></audio>
            <audio ref={localAudioRef} autoPlay></audio>
            {close === true ? (
                <IconButton
                    sx={{ backgroundColor: '#454545' }}
                    onClick={() => {
                        setClose(!close);
                    }}
                >
                    <CallIcon color="success" />
                </IconButton>
            ) : (
                <Stack direction="column" gap={2} sx={{ p: 2 }}>
                    <Stack direction="row" gap={2}>
                        <Avatar src={incomingCall.receiverInfo.avatar} />
                        <IconButton onClick={leaveButton} sx={{ backgroundColor: '#454545' }}>
                            <CallEndIcon color="error" />
                        </IconButton>
                        <IconButton onClick={muteAudioButton} sx={{ backgroundColor: '#454545' }}>
                            {actions.audio === true ? (
                                <MicIcon color="success" />
                            ) : (
                                <MicOffIcon color="error" />
                            )}
                        </IconButton>
                        <IconButton
                            sx={{ backgroundColor: '#454545' }}
                            onClick={() => {
                                setClose(!close);
                            }}
                        >
                            <CloseIcon color="warning" />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" gap={2}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {incomingCall.receiverInfo.name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {formatTime(timeRemaining)}
                        </Typography>
                    </Stack>
                </Stack>
            )}
        </Box>
    );
}
export default AudioCallView;
