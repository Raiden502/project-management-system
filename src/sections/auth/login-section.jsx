import { Box, Card, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AuthContext } from 'src/auth/JwtContext.jsx';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';

function LoginSection() {
    const { login } = useContext(AuthContext);
    const [passwordToogle, setPasswordToogle] = useState(false);

    const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });

    const HandlePageDetails = useCallback(
        (event) => {
            const { name, value } = event.target;
            setLoginDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [loginDetails]
    );

    const SubmitDetails = async () => {
        try {
            await login(loginDetails.username, loginDetails.password);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Optional: adjust the height as needed
            }}
        >
            <Card sx={{ width: 350, borderRadius: '10px', p: 3, boxShadow: 2 }}>
                <Stack gap={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Sign in to TFMS
                    </Typography>
                    <Typography variant="body2">
                        New user?{' '}
                        <Typography
                            variant="body2"
                            component={Link}
                            href="#"
                            sx={{
                                color: '#00a76f',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                marginLeft: '4px',
                            }}
                        >
                            Create an account
                        </Typography>
                    </Typography>
                    <Stack gap={3} sx={{}}>
                        <TextField
                            name="username"
                            label="Email address"
                            sx={{ height: '40px' }}
                            InputProps={{ sx: { borderRadius: '8px' } }}
                            value={loginDetails.username}
                            onChange={HandlePageDetails}
                            placeholder="Email address"
                        ></TextField>
                        <TextField
                            name="password"
                            label="Password"
                            type={passwordToogle ? 'text' : 'password'}
                            sx={{ height: '50px' }}
                            value={loginDetails.password}
                            onChange={HandlePageDetails}
                            placeholder="Password"
                            InputProps={{
                                sx: { borderRadius: '8px' },
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
                        <Box textAlign="right">
                            <Typography
                                variant="body2"
                                component={Link}
                                href="#"
                                sx={{
                                    color: '#00a76f',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                Forget Password?
                            </Typography>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: 'black',
                                textAlign: 'left',
                                borderRadius: '8px',
                                height: '50px',
                                textTransform: 'none',
                            }}
                            onClick={SubmitDetails}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                Login
                            </Typography>
                            <Iconify icon="ri:arrow-right-s-line" style={{ marginLeft: 'auto' }} />
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
}
export default LoginSection;
