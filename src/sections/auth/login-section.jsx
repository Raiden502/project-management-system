import { Box, Card, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useCallback, useContext, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AuthContext } from 'src/auth/JwtContext.jsx';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';

function LoginSection() {
    const { login, IsUnauthenticated, IsLoggedIn } = useContext(AuthContext);
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

    const checkEmailValid = useMemo(() => {
        const re = /\S+@\S+\.\S+/;
        const valid = re.test(loginDetails.username);
        return valid;
    }, [loginDetails.username]);

    const SubmitDetails = async () => {
        try {
            await login({ email: loginDetails.username, password: loginDetails.password });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    console.log(checkEmailValid, 'lohin');

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
                <Stack gap={3}>
                    <Typography variant="h4">Sign in to TFMS</Typography>
                    <Typography variant="subtitle2">
                        New user?{' '}
                        <Typography
                            variant="subtitle2"
                            component={Link}
                            to="/auth/register"
                            sx={{
                                color: '#00a76f',
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
                            sx={{ height: '50px', mb: 2 }}
                            value={loginDetails.username}
                            onChange={HandlePageDetails}
                            placeholder="Email address"
                            error={
                                (IsUnauthenticated && IsLoggedIn) ||
                                (!checkEmailValid && loginDetails.username !== '')
                            }
                            helperText={
                                !checkEmailValid &&
                                loginDetails.username !== '' &&
                                'Incorrect Email'
                            }
                        ></TextField>
                        <TextField
                            name="password"
                            label="Password"
                            error={IsUnauthenticated && IsLoggedIn}
                            helperText={
                                IsUnauthenticated && IsLoggedIn && 'Incorrect Login Details'
                            }
                            type={passwordToogle ? 'text' : 'password'}
                            sx={{ height: '50px' }}
                            value={loginDetails.password}
                            onChange={HandlePageDetails}
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
                        <Box textAlign="right">
                            <Typography
                                variant="body2"
                                component={Link}
                                href="#"
                                sx={{
                                    color: '#00a76f',
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
                                backgroundColor: '#212B36',
                                textAlign: 'left',
                                height: '50px',
                            }}
                            disabled={checkEmailValid===false || loginDetails.password===''}
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
