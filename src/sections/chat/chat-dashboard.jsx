import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    Stack,
    Avatar,
    Box,
    Card,
    Typography,
    TextField,
    Divider,
    IconButton,
    Badge,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import ChatListItem from 'src/sections/chat/chat-listItem';
import OverlayAvatar from 'src/sections/chat/group-overlay';
import { AuthContext } from 'src/auth/JwtContext';
import { CallContext } from 'src/providers/socket/CallProviders';

function ChatDashboard({ messageArray, currentChat, SendMessage }) {
    const chatContainerRef = useRef(null);
    const { user } = useContext(AuthContext);
    const { requestCall, CallDispatch } = useContext(CallContext);
    const [currentMessage, setCurrentMessage] = useState('');

    const send = () => {
        SendMessage(currentMessage);
        setCurrentMessage('');
    };

    useEffect(() => {
        // Scroll to the bottom of the chat area when messageArray changes
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messageArray]);

    return (
        <Stack direction="column" sx={{ p: 2 }}>
            <Stack
                direction="row"
                sx={{ alignItems: 'center', mb: 2 }}
                gap={4}
                justifyContent={'flex-start'}
            >
                {currentChat.type === 'normal' ? (
                    <Badge color={currentChat.onlinestatus ? 'success' : 'default'} variant="dot">
                        <Avatar alt="Remy Sharp" src={currentChat.avatar} />
                    </Badge>
                ) : (
                    <OverlayAvatar src={currentChat.avatar} alt="Avatar Alt" />
                )}
                <Typography>{currentChat.name}</Typography>
                <IconButton
                    size="small"
                    onClick={() => {
                        requestCall(
                            {
                                name: currentChat.name,
                                avatar: currentChat.avatar,
                                id: currentChat.id,
                            },
                            'video'
                        );
                    }}
                >
                    <VideocamIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => {
                        requestCall(
                            {
                                name: currentChat.name,
                                avatar: currentChat.avatar,
                                id: currentChat.id,
                            },
                            'phone'
                        );
                    }}
                >
                    <CallIcon fontSize="inherit" />
                </IconButton>
            </Stack>
            <Divider />
            <Box
                ref={chatContainerRef}
                sx={{
                    width: 700,
                    p: 2,
                    mt: 2,
                    overflowY: 'scroll',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdbdbd',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f5f5f5', // Set the color of the track
                    },
                }}
            >
                {messageArray.map((msg, index) => (
                    <ChatListItem
                        key={index}
                        row={msg}
                        avatar={currentChat.avatar}
                        currentChat={currentChat}
                    />
                ))}
            </Box>
            <Divider />
            <Stack direction="row" sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    placeholder="write message"
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '10px', // Adjust the radius to your preference
                        },
                    }}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                    }}
                    value={currentMessage}
                    InputProps={{
                        startAdornment: (
                            <IconButton size="small">
                                <EmojiEmotionsIcon
                                    sx={{ color: 'action.active', marginRight: 1 }}
                                />
                            </IconButton>
                        ),
                    }}
                ></TextField>
                <Stack direction="row" gap={2} sx={{ p: 2 }}>
                    <IconButton size="small" onClick={send}>
                        <SendIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="small">
                        <InsertPhotoIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="small">
                        <KeyboardVoiceIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ChatDashboard;
