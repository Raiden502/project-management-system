import React, { useContext } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, Avatar, Typography, Box, IconButton } from '@mui/material';
import { AuthContext } from 'src/auth/JwtContext';

function ChatListItem({ row, avatar, currentChat }) {
    const { user } = useContext(AuthContext);
    return (
        <Stack
            direction="row"
            justifyContent={row.senderid === user.user_id ? 'flex-end' : 'unset'}
            sx={{ mb: 5 }}
        >
            {row.senderid !== user.user_id && (
                <Avatar
                    alt="sender"
                    sx={{ width: 32, height: 32, mr: 2 }}
                    src={currentChat.type == 'group' ? row.avatar : avatar}
                />
            )}

            <Stack alignItems="flex-end">
                <Typography
                    noWrap
                    variant="caption"
                    sx={{
                        mb: 1,
                        color: 'text.disabled',
                        ...(row.senderid !== user.user_id && {
                            mr: 'auto',
                        }),
                    }}
                >
                    {currentChat.type == 'group' ? row.username : ''}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        position: 'relative',
                        '&:hover': {
                            '& .message-actions': {
                                opacity: 1,
                            },
                        },
                    }}
                >
                    <Stack
                        sx={{
                            pt: 1.5,
                            pl: 1.5,
                            pr: 1.5,
                            minWidth: 48,
                            maxWidth: 320,
                            borderRadius: 1,
                            typography: 'body2',
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
                            bgcolor: 'background.neutral',
                            ...(row.senderid === user.user_id && {
                                color: 'black.800',
                                bgcolor: 'rgb(200, 250, 214)',
                            }),
                            ...(false && {
                                p: 0,
                                bgcolor: 'transparent',
                            }),
                        }}
                    >
                        {false ? (
                            <Box
                                component="img"
                                alt="attachment"
                                src={'/static'}
                                onClick={() => {}}
                                sx={{
                                    minHeight: 220,
                                    borderRadius: 1.5,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.9,
                                    },
                                }}
                            />
                        ) : (
                            <Stack direction="column">
                                {row.message}
                                <Typography
                                    noWrap
                                    variant="caption"
                                    sx={{
                                        mt: 1,
                                        color: 'text.disabled',
                                        ...(row.senderid !== user.user_id && {
                                            mr: 'auto',
                                        }),
                                    }}
                                >
                                    {row.datetime}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                    <Stack
                        direction="row"
                        className="message-actions"
                        sx={{
                            pt: 0.5,
                            opacity: 0,
                            top: '100%',
                            left: 0,
                            position: 'absolute',
                            transition: (theme) =>
                                theme.transitions.create(['opacity'], {
                                    duration: theme.transitions.duration.shorter,
                                }),
                            ...(row.senderid === user.user_id && {
                                left: 'unset',
                                right: 0,
                            }),
                        }}
                    >
                        <IconButton size="small">
                            <ReplyIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton size="small">
                            <AddReactionIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton size="small">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ChatListItem;
