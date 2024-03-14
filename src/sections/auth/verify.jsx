import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
    Box,
    Card,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';

export default function Verification() {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [token, setToken] = useState({ data: {}, verified: false });
    const [passwordToogle, setPasswordToogle] = useState(false);
    const [passkey, setPasskey] = useState({ newkey: '', confirm: '' });

    useEffect(() => {
        if (id) {
            try {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                const decodedToken = jwtDecode(id);
                console.log('Decoded token:', decodedToken);
                if (decodedToken.exp < currentTimestamp) {
                    setToken((prev) => ({ data: {}, verified: false }));
                } else {
                    setToken((prev) => ({ data: decodedToken, verified: true }));
                    localStorage.clear();
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setToken((prev) => ({ data: {}, verified: false }));
            }
        }
    }, [id]);

    const updatePassword = async () => {
        try {
            if (passkey.confirm !== passkey.newkey) {
                enqueueSnackbar('password mismatch', { variant: 'error' });
                return;
            }
            const response = await axiosInstance.post('/user/update_password', {
                ...token.data,
                confirm: passkey.confirm,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/auth/login');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    console.log(token.verified);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Optional: adjust the height as needed
            }}
        >
            <Card sx={{ width: 400, p: 3 }}>
                {token.verified && (
                    <Stack gap={3}>
                        <Typography variant="h4">Hi {token.data.user_name}</Typography>
                        <Box>
                            <Typography variant="subtitle2">{token.data.email_addrs}</Typography>
                            <Typography variant="subtitle2">Please reset the password</Typography>
                        </Box>
                        <Stack gap={3} sx={{}}>
                            <TextField
                                name="password"
                                label="Password"
                                type={passwordToogle ? 'text' : 'password'}
                                sx={{ height: '50px' }}
                                value={passkey.newkey}
                                onChange={(e) =>
                                    setPasskey((prev) => ({ ...prev, newkey: e.target.value }))
                                }
                                placeholder="Password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setPasswordToogle((prev) => !prev)}
                                                edge="end"
                                            >
                                                <Iconify
                                                    icon={
                                                        passwordToogle
                                                            ? 'solar:eye-bold'
                                                            : 'solar:eye-closed-bold'
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                            <TextField
                                name="password"
                                label="Confirm Password"
                                type="password"
                                sx={{ height: '50px' }}
                                value={passkey.confirm}
                                error={passkey.confirm !== passkey.newkey || passkey.newkey === ''}
                                onChange={(e) =>
                                    setPasskey((prev) => ({ ...prev, confirm: e.target.value }))
                                }
                                placeholder="Password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end">
                                                <Iconify icon="solar:eye-closed-bold" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#212B36',
                                    textAlign: 'left',
                                    height: '50px',
                                }}
                                onClick={updatePassword}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Reset
                                </Typography>
                                <Iconify
                                    icon="ri:arrow-right-s-line"
                                    style={{ marginLeft: 'auto' }}
                                />
                            </Button>
                        </Stack>
                    </Stack>
                )}
                {token.verified === false && (
                    <Typography>Inavlid Request please create new session</Typography>
                )}
            </Card>
        </Box>
    );
}
