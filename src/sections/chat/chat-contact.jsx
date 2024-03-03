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
import { useContext } from 'react';
import { AuthContext } from 'src/auth/JwtContext';
import Iconify from 'src/components/iconify/Iconify';
import GroupComponent from './group-create';
import { useBoolean } from 'src/utils/use-boolean';

function ChatContactView({ userList, ChangeChatOnTap, localSearch, ChangeNavBar }) {
    const { user } = useContext(AuthContext);
    const groupOpen = useBoolean()

    return (
        <Stack direction="column" gap={2} sx={{ p: 3, width: 400 }}>
            <Stack direction="row" sx={{ alignItems: 'center' }} justifyContent={'space-between'}>
                <Avatar alt="Remy Sharp" src={user.avatar} />
                <Stack gap={3} direction="row">
                    <IconButton size="small" onClick={groupOpen.onTrue}>
                        <Iconify icon="lets-icons:group-add-fill" />
                    </IconButton>
                    <IconButton size="small" onClick={ChangeNavBar}>
                        <KeyboardArrowLeftIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Stack>
            <TextField
                fullWidth
                InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active' }} />,
                }}
                onChange={(e) => localSearch(e.target.value)}
                placeholder="Search contacts..."
            ></TextField>
            <Box
                sx={{
                    height: 300,
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
                {userList.map((data) => (
                    <Stack
                        direction="row"
                        sx={{
                            p: 1,
                            mb: 1,
                            ml: 0,
                            '&:hover': {
                                backgroundColor: '#f7f7f7',
                                borderRadius: 1,
                                cursor: 'pointer',
                            },
                        }}
                        gap={data.type === 'normal' ? 2 : 1}
                        onClick={() => {
                            ChangeChatOnTap(data.id);
                        }}
                    >
                        {data.type === 'normal' ? (
                            <Badge color={data.onlinestatus ? 'success' : 'default'} variant="dot">
                                <Avatar alt="Remy Sharp" src={data.avatar} />
                            </Badge>
                        ) : (
                            <OverlayAvatar src={data.avatar} alt="Avatar Alt" />
                        )}
                        <Stack direction="column">
                            <Typography
                                noWrap
                                variant="body2"
                                sx={{ fontSize: 16, color: '#212B36' }}
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
            <GroupComponent open={groupOpen} />
        </Stack>
    );
}

export default ChatContactView;
