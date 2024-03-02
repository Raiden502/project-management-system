import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
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
    InputBase,
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
import Iconify from 'src/components/iconify/Iconify';

function ChatDashboard({ messageArray, currentChat, SendMessage }) {
    const chatContainerRef = useRef(null);
    const { user } = useContext(AuthContext);
    const { requestCall, CallDispatch } = useContext(CallContext);
    const [currentMessage, setCurrentMessage] = useState('');

    const send = useCallback((event) => {
        if (event.key === 'Enter') {
            SendMessage(currentMessage);
            setCurrentMessage('');
        }
    });

    useEffect(() => {
        // Scroll to the bottom of the chat area when messageArray changes
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messageArray]);

    return (
        <Stack direction="column" sx={{ p: 2, width: '100%' }}>
            <Stack direction="row" justifyContent={'space-between'} mb={2}>
                <Stack direction="row" gap={3} sx={{ alignItems: 'center' }}>
                    {currentChat.type === 'normal' ? (
                        <Badge
                            color={currentChat.onlinestatus ? 'success' : 'default'}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={currentChat.avatar} />
                        </Badge>
                    ) : (
                        <OverlayAvatar src={currentChat.avatar} alt="Avatar Alt" />
                    )}
                    <Typography>{currentChat.name}</Typography>
                </Stack>

                <Stack direction="row" gap={2} sx={{ alignItems: 'center', mr:3 }}>
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
                        <Iconify icon="basil:video-solid" />
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
                        <Iconify icon="fluent:call-28-filled" />
                    </IconButton>
                </Stack>
            </Stack>
            <Divider />
            <Box
                ref={chatContainerRef}
                sx={{
                    height: '100%',
                    p: 2,
                    mt: 2,
                    overflowY: 'hidden', // Initially hide the scrollbar
                    '&:hover': {
                        overflowY: 'auto', // Show the scrollbar on hover
                    },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#D5CECC',
                        borderRadius: '4px',
                        height: '10px',
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
            <InputBase
                value={currentMessage}
                onKeyUp={send}
                onChange={useCallback((e) => {
                    setCurrentMessage(e.target.value);
                })}
                placeholder="Type a message"
                startAdornment={
                    <IconButton>
                        <Iconify icon="eva:smiling-face-fill" />
                    </IconButton>
                }
                endAdornment={
                    <Stack direction="row" sx={{ flexShrink: 0 }}>
                        <IconButton onClick={() => {}}>
                            <Iconify icon="solar:gallery-add-bold" />
                        </IconButton>
                        <IconButton onClick={() => {}}>
                            <Iconify icon="eva:attach-2-fill" />
                        </IconButton>
                        <IconButton>
                            <Iconify icon="solar:microphone-bold" />
                        </IconButton>
                    </Stack>
                }
                sx={{
                    px: 1,
                    height: 56,
                    flexShrink: 0,
                    borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
            />

            <input type="file" style={{ display: 'none' }} />

            {/* <Stack direction="row" sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    placeholder="write message"
                    sx={{}}
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
            </Stack> */}
        </Stack>
    );
}

export default ChatDashboard;
