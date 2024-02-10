import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { CallContext } from 'src/providers/socket/CallProviders';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import { useCallSocket } from 'src/utils/socket';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
};

function VideoCallView() {
    const { CallDispatch, incomingCall } = useContext(CallContext);
    const IoInstance = useCallSocket();
    const [actions, setActions] = useState({ audio: false, video: true });
    const peerConnection = new RTCPeerConnection(servers);
    const localStreamRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

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

    const muteVideoButton = () => {
        const videoTracks = localStreamRef.current.getVideoTracks();
        videoTracks.forEach((track) => {
            track.enabled = !actions.video;
        });
        setActions({ ...actions, video: !actions.video });
    };

    const leaveButton = () => {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        peerConnection.close();
        IoInstance.emit('leave', {
            receiverId: incomingCall.receiverInfo.id,
            payload: null,
        });
        CallDispatch({ type: 'SET_LEAVE' });
        window.close()
    };
    const startCall = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    // width: { ideal: 320 },
                    // height: { ideal: 180 },
                    frameRate: { ideal: 24 },
                },
                audio: true,
            })
            .then((stream) => {
                localStreamRef.current = stream;
                localVideoRef.current.srcObject = localStreamRef.current;
                localStreamRef.current
                    .getTracks()
                    .forEach((track) => peerConnection.addTrack(track, localStreamRef.current));

                const audioTracks = localStreamRef.current.getAudioTracks();
                audioTracks.forEach((track) => {
                    track.enabled = false;
                });
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
        remoteVideoRef.current.srcObject = event.stream;
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
        window.close()
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
                backgroundColor: 'black',
                height: '90vh', // Full viewport height
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
            }}
        >
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    width: '100%',
                    height: '100%', // Adjust as needed
                }}
            >
                <video
                    ref={remoteVideoRef}
                    width="1280"
                    height="420"
                    autoPlay
                    style={{ borderRadius: '15px' }}
                ></video>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'transparent',
                    }}
                >
                    <video
                        ref={localVideoRef}
                        width="320"
                        height="240"
                        autoPlay
                        style={{ borderRadius: '10px' }}
                    ></video>
                </Box>
            </Stack>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    justifyContent: 'space-evenly',
                    p: 1,
                    bottom: '10px',
                    backgroundColor: '#454545',
                    borderRadius: '15px',
                    width: '15%',
                }}
                gap={3}
            >
                <IconButton onClick={leaveButton} sx={{ backgroundColor: 'black' }}>
                    <CallEndIcon color="error" />
                </IconButton>
                <IconButton onClick={muteAudioButton} sx={{ backgroundColor: 'black' }}>
                    {actions.audio === true ? (
                        <MicIcon color="success" />
                    ) : (
                        <MicOffIcon color="error" />
                    )}
                </IconButton>
                <IconButton onClick={muteVideoButton} sx={{ backgroundColor: 'black' }}>
                    {actions.video === true ? (
                        <VideocamIcon color="success" />
                    ) : (
                        <VideocamOffIcon color="error" />
                    )}
                </IconButton>
            </Stack>
        </Box>
    );
}
export default VideoCallView;
