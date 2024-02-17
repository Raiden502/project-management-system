import React, { useState, useEffect, useContext, useRef } from 'react';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { CallContext } from 'src/providers/socket/CallProviders';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import {useCallSocket } from 'src/utils/socket';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
};

function AudioCallView() {
    const { CallDispatch, incomingCall } = useContext(CallContext);
    const IoInstance = useCallSocket()
    const peerConnection = new RTCPeerConnection(servers);
    const [actions, setActions] = useState({ audio: false });
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [close, setClose] = useState(true);
    const localStreamRef = useRef(null);
    const localAudioRef = useRef(null);
    const remoteAudioRef = useRef(null);

    const callButton = () => {
        peerConnection
            .createOffer()
            .then((offer) => {
                peerConnection.setLocalDescription(offer);
                IoInstance.emit('offer', {
                    payload: offer,
                    receiverId: incomingCall.receiverInfo.id,
                });
            })
            .catch((error) => console.error('Error creating offer:', error));
    };

    const muteAudioButton = () => {
        const audioTracks = localStreamRef.current.getAudioTracks();
        audioTracks.forEach((track) => {
            track.enabled = !actions.audio;
        });
        setActions({ ...actions, audio: !actions.audio });
    };

    const leaveButton = () => {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        peerConnection.close();
        IoInstance.emit('leave', {
            receiverId: incomingCall.receiverInfo.id,
            payload: null,
        });
        CallDispatch({ type: 'SET_LEAVE' });
    };
    const startCall = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: false,
                audio: true,
            })
            .then((stream) => {
                localStreamRef.current = stream;
                localAudioRef.current.srcObject = localStreamRef.current;
                localStreamRef.current
                    .getAudioTracks()
                    .forEach((track) => peerConnection.addTrack(track, localStreamRef.current));

                callButton();
            })
            .catch((error) => console.error('Error accessing media devices:', error));
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            IoInstance.emit('candidate', {
                payload: event.candidate,
                receiverId: incomingCall.receiverInfo.id,
            });
        }
    };

    peerConnection.onaddstream = (event) => {
        remoteAudioRef.current.srcObject = event.stream;
    };

    const offerListener = (receivedMessage) => {
        const { payload } = receivedMessage;
        peerConnection
            .setRemoteDescription(new RTCSessionDescription(payload))
            .then(() => peerConnection.createAnswer())
            .then((answer) => {
                peerConnection.setLocalDescription(answer);
                IoInstance.emit('answer', {
                    payload: answer,
                    receiverId: incomingCall.receiverInfo.id,
                });
            })
            .catch((error) => console.error('Error creating answer:', error));
    };
    const answerListener = (receivedMessage) => {
        const { payload } = receivedMessage;
        peerConnection.setRemoteDescription(new RTCSessionDescription(payload));
    };
    const candidateListener = (receivedMessage) => {
        const { payload } = receivedMessage;
        peerConnection.addIceCandidate(new RTCIceCandidate(payload));
    };

    const leaveListner = (receivedMessage) => {
        const { payload } = receivedMessage;
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        peerConnection.close();
        CallDispatch({ type: 'SET_LEAVE' });
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) =>prevTime+1);
        }, 1000);
        return () => clearInterval(timerInterval);
    }, []);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        if (IoInstance) {
            if (incomingCall.accept) {
                startCall();
            }
            IoInstance.on('offer', offerListener);
            IoInstance.on('answer', answerListener);
            IoInstance.on('candidate', candidateListener);
            IoInstance.on('leave', leaveListner);

            return () => {
                IoInstance.off('offer', offerListener);
                IoInstance.off('answer', answerListener);
                IoInstance.off('candidate', candidateListener);
                IoInstance.off('leave', leaveListner);
            };
        }
    }, [IoInstance, incomingCall.accept]);
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#212B36',
                p: 0.5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                borderRadius: close ? '50px' : '10px',
                width: close ? '40px' : 'auto',
                transition: 'width 2s linear 1s',
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
