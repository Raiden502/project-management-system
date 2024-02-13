import {
    TextField,
    Typography,
    Box,
    Card,
    Stack,
    Avatar,
    Divider,
    IconButton,
    Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OverlayAvatar from 'src/sections/chat/group-overlay';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function ChatContactView({ user, ChangeChatOnTap, localSearch, ChangeNavBar }) {
    return (
        <Stack component={Card} direction="column" gap={2} sx={{ p: 3, width: 250 }}>
            <Stack
                direction="row"
                sx={{ alignItems: 'center' }}
                gap={1}
                justifyContent={'space-between'}
            >
                <Avatar
                    alt="Remy Sharp"
                    src={
                        'data:image/jpeg;base64,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'
                    }
                />
                <IconButton size="small" onClick={ChangeNavBar}>
                    <KeyboardArrowLeftIcon fontSize="inherit" />
                </IconButton>
            </Stack>
            <Divider light />
            <TextField
                fullWidth
                InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', marginLeft: 0 }} />,
                }}
                onChange={(e) => localSearch(e.target.value)}
                placeholder="Search contacts..."
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '10px', // Adjust the radius to your preference
                    },
                }}
            ></TextField>
            <Box
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
                            p: 1,
                            mb: 1,
                            ml: 0,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer',
                            },
                        }}
                        gap={data.type === 'normal' ? 2 : 1}
                        onClick={() => {
                            ChangeChatOnTap(data.id);
                        }}
                    >
                        {data.type === 'normal' ? (
                            <Badge color={data.onlinestatus?"success":"default"} variant="dot">
                                <Avatar alt="Remy Sharp" src={data.avatar} />
                            </Badge>
                        ) : (
                            <OverlayAvatar src={data.avatar} alt="Avatar Alt" />
                        )}
                        <Stack direction="column">
                            <Typography
                                noWrap
                                variant="body2"
                                sx={{ fontSize: 16, color: 'black' }}
                            >
                                {data.name}
                            </Typography>
                            <Box
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '11rem',
                                    textAlign: 'left',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ fontSize: 14, color: 'text.disabled' }}
                                >
                                    {data?.lastmsg}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                ))}
            </Box>
        </Stack>
    );
}

export default ChatContactView;
