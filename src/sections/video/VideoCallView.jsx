import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { CallContext } from 'src/providers/socket/CallProviders';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import { useTheme } from '@emotion/react';
import Iconify from 'src/components/iconify/Iconify';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
};

const displayMediaOptions = {
    video: {
        displaySurface: 'browser',
        cursor: 'always',
    },
    audio: {
        suppressLocalAudioPlayback: false,
    },
    preferCurrentTab: false,
    selfBrowserSurface: 'exclude',
    systemAudio: 'include',
    surfaceSwitching: 'include',
    monitorTypeSurfaces: 'include',
};

const callMediaOptions = {
    video: {
        width: { ideal: 320 },
        height: { ideal: 240 },
        frameRate: { ideal: 24 },
    },
    audio: true,
};

function VideoCallView() {
    const { CallDispatch, incomingCall, IoInstance } = useContext(CallContext);
    const [actions, setActions] = useState({ audio: false, video: true });
    const [screenSharing, setScreenSharing] = useState('cam');
    const peerConnection = useRef(new RTCPeerConnection(servers));
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
        peerConnection.current.close();
        IoInstance.current.emit('leave', {
            receiverId: incomingCall.receiverInfo.id,
            payload: null,
        });
        CallDispatch({ type: 'SET_LEAVE' });
    };

    const toggleScreenSharing = async () => {
        try {
            let stream;
            if (screenSharing === 'cam') {
                stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            } else {
                stream = await navigator.mediaDevices.getUserMedia(callMediaOptions);
            }

            localStreamRef.current.getTracks().forEach((track) => track.stop());
            localStreamRef.current = stream;
            localVideoRef.current.srcObject = localStreamRef.current;

            const audioTracks = localStreamRef.current.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = false;
            });

            const senders = peerConnection.current.getSenders();
            console.log('-->', senders);
            senders.forEach(async (sender) => {
                const track = localStreamRef.current
                    .getTracks()
                    .find((t) => t.kind === sender.track.kind);
                if (track) {
                    await sender.replaceTrack(track);
                }
            });

            setScreenSharing((prev) => (prev === 'cam' ? 'screen' : 'cam'));
        } catch (error) {
            console.error('Error accessing screen sharing:', error);
        }
    };

    const startCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(callMediaOptions);
            localStreamRef.current = stream;
            localVideoRef.current.srcObject = localStreamRef.current;
            localStreamRef.current
                .getTracks()
                .forEach((track) => peerConnection.current.addTrack(track, localStreamRef.current));

            const audioTracks = localStreamRef.current.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = false;
            });

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            IoInstance.current.emit('offer', {
                payload: offer,
                receiverId: incomingCall.receiverInfo.id,
            });
        } catch (err) {
            console.error(err);
        }
    };

    peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
            IoInstance.current.emit('candidate', {
                payload: event.candidate,
                receiverId: incomingCall.receiverInfo.id,
            });
        }
    };

    peerConnection.current.onaddstream = (event) => {
        remoteVideoRef.current.srcObject = event.stream;
    };

    const offerListener = async (receivedMessage) => {
        const { payload } = receivedMessage;

        try {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

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
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(payload));
    };
    const candidateListener = async (receivedMessage) => {
        const { payload } = receivedMessage;
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(payload));
    };

    const leaveListner = async (receivedMessage) => {
        const { payload } = receivedMessage;
        await localStreamRef.current.getTracks().forEach((track) => track.stop());
        peerConnection.current.close();
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
                // width: 1000,
                p: 3,
                borderRadius: 1,
            }}
        >
            <Stack
                direction="row"
                // gap={3}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#212B36',
                }}
            >
                <video
                    ref={remoteVideoRef}
                    width="640"
                    height="420"
                    autoPlay
                    style={{ borderRadius: '10px' }}
                ></video>
                <video
                    ref={localVideoRef}
                    width="640"
                    height="420"
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
                <IconButton
                    onClick={toggleScreenSharing}
                    sx={{
                        backgroundColor: '#212B36',
                        color: screenSharing === 'screen' ? 'green' : 'red',
                    }}
                >
                    {screenSharing === 'screen' ? (
                        <Iconify icon="ic:baseline-screen-share" />
                    ) : (
                        <Iconify icon="ic:baseline-stop-screen-share" />
                    )}
                </IconButton>
                <IconButton onClick={leaveButton} sx={{ backgroundColor: '#212B36', color: 'red' }}>
                    <Iconify icon="solar:end-call-bold" />
                </IconButton>
                <IconButton
                    onClick={muteAudioButton}
                    sx={{
                        backgroundColor: '#212B36',
                        color: actions.audio === true ? 'green' : 'red',
                    }}
                >
                    {actions.audio === true ? (
                        <Iconify icon="ion:mic" />
                    ) : (
                        <Iconify icon="ion:mic-off" />
                    )}
                </IconButton>
                <IconButton
                    onClick={muteVideoButton}
                    sx={{
                        backgroundColor: '#212B36',
                        color: actions.video === true ? 'green' : 'red',
                    }}
                >
                    {actions.video === true ? (
                        <Iconify icon="fluent:video-28-filled" />
                    ) : (
                        <Iconify icon="fluent:video-off-16-filled" />
                    )}
                </IconButton>
            </Stack>
        </Stack>
    );
}
export default VideoCallView;
