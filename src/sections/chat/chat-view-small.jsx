import { Box, Avatar, IconButton, Stack, Divider, Card } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import OverlayAvatar from 'src/sections/chat/group-overlay';

function ChatViewSmall({ ChangeNavBar, user, ChangeChatOnTap }) {
    return (
        <Stack component={Card} direction="column" gap={2} sx={{ p: 3, width: 100 }}>
            <Box sx={{ p: 1 }}>
                <IconButton size="small" onClick={ChangeNavBar}>
                    <KeyboardArrowRightIcon fontSize="inherit" />
                </IconButton>
            </Box>
            <Divider light />
            <Stack
                // max={4}
                direction="column"
                gap={2}
                sx={{
                    height: 300,
                    overflowY: 'scroll',
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
                {user.map((data) => (
                    <Stack
                        direction="row"
                        sx={{
                            p:1,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                cursor:'pointer'
                            },
                            display:'flex',
                            justifyContent:'center'
                        }}
                        onClick={() => {
                            ChangeChatOnTap(data.id);
                        }}
                    >
                        {data.type === 'normal' ? (
                            <Avatar alt="Remy Sharp" src={data.avatar} />
                        ) : (
                            <OverlayAvatar src={data.avatar} alt="Avatar Alt" />
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}

export default ChatViewSmall;
