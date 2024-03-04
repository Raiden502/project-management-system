import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { CallContext } from 'src/providers/socket/CallProviders';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import { useTheme } from '@emotion/react';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
};

function VideoCallView() {
    const { CallDispatch, incomingCall, IoInstance } = useContext(CallContext);
    const [actions, setActions] = useState({ audio: false, video: true });
    const peerConnection = new RTCPeerConnection(servers);
    const localStreamRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const muteAudioButton = () => {
        const audioTracks = localStreamRef.current.getAudioTracks();
        audioTracks.forEach((track) => {
            track.enabled = !actions.audio;
        });
        setActions({ ...actions, audio: !actions.audio });
    };

    const muteVideoButton = () => {
        const videoTracks = localStreamRef.current.getVideoTracks();
        videoTracks.forEach((track) => {
            track.enabled = !actions.video;
        });
        setActions({ ...actions, video: !actions.video });
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
                video: {
                    width: { ideal: 320 },
                    height: { ideal: 240 },
                    frameRate: { ideal: 24 },
                },
                audio: true,
            });

            localStreamRef.current = stream;
            localVideoRef.current.srcObject = localStreamRef.current;
            localStreamRef.current
                .getTracks()
                .forEach((track) => peerConnection.addTrack(track, localStreamRef.current));

            const audioTracks = localStreamRef.current.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = false;
            });

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
        remoteVideoRef.current.srcObject = event.stream;
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
        <Stack
            direction="column"
            gap={3}
            sx={{
                backgroundColor: '#212B36',
                alignItems: 'center',
                position: 'relative',
                width: 700,
                p: 3,
                borderRadius: 1,
            }}
        >
            <Stack
                direction="row"
                gap={3}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#212B36',
                }}
            >
                <video
                    ref={remoteVideoRef}
                    width="320"
                    height="240"
                    autoPlay
                    style={{ borderRadius: '10px' }}
                ></video>
                <video
                    ref={localVideoRef}
                    width="320"
                    height="240"
                    autoPlay
                    style={{ borderRadius: '10px' }}
                ></video>
            </Stack>
            <Stack
                direction="row"
                sx={{
                    justifyContent: 'space-evenly',
                    p: 1,
                    backgroundColor: '#454545',
                    borderRadius: '15px',
                }}
                gap={3}
            >
                <IconButton onClick={leaveButton} sx={{ backgroundColor: '#212B36' }}>
                    <CallEndIcon color="error" />
                </IconButton>
                <IconButton onClick={muteAudioButton} sx={{ backgroundColor: '#212B36' }}>
                    {actions.audio === true ? (
                        <MicIcon color="success" />
                    ) : (
                        <MicOffIcon color="error" />
                    )}
                </IconButton>
                <IconButton onClick={muteVideoButton} sx={{ backgroundColor: '#212B36' }}>
                    {actions.video === true ? (
                        <VideocamIcon color="success" />
                    ) : (
                        <VideocamOffIcon color="error" />
                    )}
                </IconButton>
            </Stack>
        </Stack>
    );
}
export default VideoCallView;
