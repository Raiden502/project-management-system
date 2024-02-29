import {
    Box,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from 'src/auth/JwtContext.jsx';
import Iconify from 'src/components/iconify/Iconify';
import { Link } from 'react-router-dom';
import MyTimeline from './timeline';

const steps = ['Enter user details', 'Create Organization', 'Create Department'];

function RegisterSection() {
    const { register } = useContext(AuthContext);
    const [passwordToogle, setPasswordToogle] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [newUser, setUserDetails] = useState({
        username: '',
        password: '',
        companyname: '',
        email: '',
        org_name: '',
        org_desc: '',
        dept_name: '',
        dept_desc: '',
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
            await register(newUser);
        } catch (error) {
            console.error('Registered failed', error);
        }
    };

    const HandleNextTab = () => {
        setCurrentStep((prev) => (prev === 3 ? 3 : prev + 1));
    };

    const HandlePrevTab = () => {
        setCurrentStep((prev) => (prev === 1 ? 1 : prev - 1));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Stack spacing={2}>
                        <TextField
                            name="username"
                            label="Full Name"
                            value={newUser.username}
                            onChange={HandlePageDetails}
                        ></TextField>
                        <TextField
                            name="password"
                            label="Password"
                            type={passwordToogle ? 'text' : 'password'}
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
                            value={newUser.companyname}
                            onChange={HandlePageDetails}
                        ></TextField>
                        <TextField
                            name="email"
                            label="Bussiness Email"
                            value={newUser.email}
                            onChange={HandlePageDetails}
                            placeholder="example@company.com"
                        ></TextField>
                    </Stack>
                );

            case 2:
                return (
                    <Stack spacing={2}>
                        <TextField
                            name="org_name"
                            label="Organization Name"
                            value={newUser.org_name}
                            onChange={HandlePageDetails}
                        ></TextField>
                        <TextField
                            multiline
                            rows={5}
                            maxRows={10}
                            name="org_desc"
                            label="Description"
                            value={newUser.org_desc}
                            onChange={HandlePageDetails}
                            placeholder="description"
                        ></TextField>
                    </Stack>
                );

            case 3:
                return (
                    <Stack spacing={2}>
                        <TextField
                            name="dept_name"
                            label="Department Name"
                            value={newUser.dept_name}
                            onChange={HandlePageDetails}
                        ></TextField>
                        <TextField
                            multiline
                            rows={5}
                            maxRows={10}
                            name="dept_desc"
                            label="Description"
                            value={newUser.dept_desc}
                            onChange={HandlePageDetails}
                            placeholder="description"
                        ></TextField>
                    </Stack>
                );
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Card sx={{ p: 3, width: 500 }}>
                <Stack spacing={2}>
                    <Typography variant="h4" sx={{}}>
                        Welcome to TFMS
                    </Typography>
                    <Typography variant="subtitle2" sx={{}}>
                        Already have an account?{' '}
                        <Typography
                            variant="subtitle2"
                            component={Link}
                            to="/auth/login"
                            sx={{
                                color: '#00a76f',
                                marginLeft: '4px',
                            }}
                        >
                            Sign in
                        </Typography>
                    </Typography>
                    <Box>
                        <Stepper activeStep={currentStep - 1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>
                                        <Typography variant="body2">{label}</Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    {renderStepContent()}
                    {currentStep === 3 && (
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                    By signing up, I agree to Terms of Service and Privacy Policy.
                                </Typography>
                            }
                        />
                    )}
                    <Box flexDirection="row" display="flex" justifyContent="space-between">
                        <IconButton onClick={HandlePrevTab}>
                            <Iconify icon="ri:arrow-left-s-line" style={{ marginLeft: 'auto' }} />
                        </IconButton>

                        {currentStep < 3 ? (
                            <IconButton onClick={HandleNextTab}>
                                <Iconify
                                    icon="ri:arrow-right-s-line"
                                    style={{ marginLeft: 'auto' }}
                                />
                            </IconButton>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#212B36',
                                    textAlign: 'left',
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
                        )}
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
}
export default RegisterSection;
