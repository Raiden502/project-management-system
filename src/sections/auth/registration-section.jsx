import {
    Box,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from 'src/auth/JwtContext.jsx';
import Iconify from 'src/components/iconify/Iconify';
import { Link } from 'react-router-dom';

function RegisterSection() {
    const { register } = useContext(AuthContext);
    const [passwordToogle, setPasswordToogle] = useState(false);

    const [newUser, setUserDetails] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    const HandlePageDetails = useCallback(
        (event) => {
            const { name, value } = event.target;
            setUserDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [newUser]
    );

    const SubmitDetails = async () => {
        try {
            await register(newUser.username, newUser.password, newUser.firstname, newUser.lastname);
        } catch (error) {
            console.error('Registered failed', error);
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
            <Card sx={{ width: 750, p: 3}}>
                <Stack gap={3}>
                    <Typography variant="h4" sx={{}}>
                        Welcome to TFMS
                    </Typography>
                    <Typography variant="subtitle2" sx={{}}>
                        Already have an account?{' '}
                        <Typography
                            variant="subtitle2"
                            component={Link}
                            href="#"
                            sx={{
                                color: '#00a76f',
                                marginLeft: '4px',
                            }}
                        >
                            Sign in
                        </Typography>
                    </Typography>
                    <Stack gap={3} direction="row">
                        <Stack gap={3} sx={{ width: 350 }}>
                            <TextField
                                name="firstname"
                                label="Full Name"
                                sx={{ height: '50px' }}
                                value={newUser.firstname}
                                onChange={HandlePageDetails}
                            ></TextField>
                            <TextField
                                name="password"
                                label="Password"
                                type={passwordToogle ? 'text' : 'password'}
                                sx={{ height: '50px' }}
                                value={newUser.password}
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
                            <TextField
                                name="companyname"
                                label="Company name"
                                sx={{height: '50px' }}
                                value={newUser.lastname}
                                onChange={HandlePageDetails}
                            ></TextField>
                            <TextField
                                name="username"
                                label="Bussiness Email"
                                sx={{ height: '50px' }}
                                value={newUser.username}
                                onChange={HandlePageDetails}
                                placeholder="example@company.com"
                            ></TextField>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label={
                                    <Typography
                                        variant="subtitle2"
                                        sx={{color: 'text.disabled' }}
                                    >
                                        By signing up, I agree to Terms of Service and Privacy
                                        Policy.
                                    </Typography>
                                }
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#212B36',
                                    textAlign: 'left',
                                    height: '50px',
                                }}
                                onClick={SubmitDetails}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Register
                                </Typography>
                                <Iconify
                                    icon="ri:arrow-right-s-line"
                                    style={{ marginLeft: 'auto' }}
                                />
                            </Button>
                        </Stack>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ color: '#212B36' }}
                        />
                        <Stack gap={3} sx={{ width: 350 }}>
                            <TextField
                                name="department"
                                label="Department Name"
                                sx={{height: '50px' }}
                                value={newUser.firstname}
                                onChange={HandlePageDetails}
                            ></TextField>
                            <TextField
                                multiline
                                rows={6}
                                maxRows={10}
                                name="description"
                                label="Description"
                                value={newUser.password}
                                onChange={HandlePageDetails}
                                placeholder="description"
                            ></TextField>
                            <Button
                                variant="outlined"
                                color="warning"
                                sx={{ width: 50 }}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
}
export default RegisterSection;
