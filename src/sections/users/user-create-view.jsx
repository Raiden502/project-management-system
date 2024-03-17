import {
    Autocomplete,
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    Chip,
    FormControlLabel,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'src/components/snackbar';
import { AuthContext } from 'src/auth/JwtContext';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';
import axiosInstance from 'src/utils/axios';
import { useBoolean } from 'src/utils/use-boolean';
import { LoadingScreen } from 'src/components/loading-screen';
import { de } from 'date-fns/locale';
import { useTheme } from '@emotion/react';

const formList = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email Address' },
];

const tempData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    departments: [],
    avatar: '',
};

const Roles = [
    { role_id: 'super_admin', name: 'Super Admin' },
    { role_id: 'admin', name: 'Admin' },
    { role_id: 'user', name: 'User' },
];

export default function UsersCreateView() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme()
    const loading = useBoolean();
    const [formData, setFormData] = useState({ ...tempData });
    const [selectedImages, setSelectedImages] = useState(null);
    const { user } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [dept, setDept] = useState([]);

    const HandleUserList = (event, emitValue) => {
        setFormData((prev) => ({
            ...prev,
            departments: [...emitValue.map((option) => option.department_id)],
        }));
    };

    const HandleDetails = (event) => {
        const { name, value } = event.target;
        if (name === 'role' && value === 'super_admin') return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const syncData = async () => {
        try {
            loading.onTrue();
            const requestData = { ...formData, avatar: selectedImages, org_id: user.org_id };
            console.log(requestData);
            const response = await axiosInstance.post(
                location.state?.userId ? '/user/edit_user_details' : '/user/create_user',
                requestData
            );
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                navigate('/dashboard/users/list');
            } else {
                enqueueSnackbar('failed to save', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
        finally{
            loading.onFalse()
        }
    };

    const mailVerify = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DEV_MAIL_API}api/send-user-password`,
                { user_id: location.state?.userId }
            );
            const { status } = response.data;
            if (status) {
                enqueueSnackbar('verification mail sent', { variant: 'success' });
            } else {
                enqueueSnackbar('failed to send mail', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to send mail', { variant: 'error' });
        }
    };

    const fetchDept = async () => {
        try {
            const response = await axiosInstance.post('/dept/dept_list', { org_id: user.org_id });
            const { data, errorcode, verified, message } = response.data;
            if (errorcode === 0) {
                setDept(data);
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getUserData = async () => {
        try {
            loading.onTrue();
            const response = await axiosInstance.post('/user/user_details', {
                user_id: location.state?.userId,
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setFormData(data);
                setSelectedImages(data['avatar']);
            }
        } catch (err) {
            console.log(err);
        } finally {
            loading.onFalse();
        }
    };

    const secondRender = useRef(true);
    useEffect(() => {
        if (secondRender.current) {
            fetchDept();
            secondRender.current = false;
        }
    }, [dept]);

    const firstRender = useRef(true);
    useEffect(() => {
        if (location.state?.userId && firstRender.current) {
            getUserData();
            firstRender.current = false;
        }
    }, [location.state?.userId]);

    console.log(dept)
    return (
        <>
            <Backdrop open={loading.value} sx={{zIndex:theme.zIndex.appBar +1}}>
                <LoadingScreen />
            </Backdrop>
            {loading.value === false && (
                <Grid container spacing={3}>
                    <Grid
                        md={4}
                        component={Card}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Stack sx={{ alignItems: 'center' }} gap={3}>
                            <AvatarUploader
                                selectedImages={selectedImages}
                                setSelectedImages={setSelectedImages}
                            />
                            <Typography variant="body2" sx={{ width: 190, textAlign: 'center' }}>
                                Allowed *.jpeg, *.jpg, *.png max size of 3 Mb
                            </Typography>
                            <Stack
                                sx={{
                                    p: 2,
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '8px',
                                }}
                                gap={2}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="subtitle1">User Verification</Typography>
                                    <Button
                                        variant="contained"
                                        disabled={location.state?.userId ? 0 : 1}
                                        onClick={mailVerify}
                                    >
                                        Verify
                                    </Button>
                                </Stack>
                                <Typography variant="body2" maxWidth={600}>
                                    {`Automatically sends the user a verification email on creating a user. You can verify it manually while editing`}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid
                        xs={12}
                        md={8}
                        component={Card}
                        sx={{
                            p: 3,
                        }}
                    >
                        <Box
                            gap={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(1, 1fr)',
                                md: 'repeat(2, 1fr)',
                            }}
                            sx={{ mb: 3 }}
                        >
                            {formList.map((item) => (
                                <TextField
                                    name={item.id}
                                    label={item.label}
                                    value={formData[item.id]}
                                    onChange={HandleDetails}
                                />
                            ))}
                            <TextField
                                name="phone"
                                label="Phone Number"
                                value={formData.phone}
                                onChange={HandleDetails}
                                type="number"
                            />
                            <TextField
                                select
                                fullWidth
                                label="Roles"
                                name="role"
                                disabled={formData.role === 'super_admin' && location.state?.userId}
                                value={formData.role}
                                onChange={HandleDetails}
                            >
                                {Roles.map((item) => (
                                    <MenuItem key={item.role_id} value={item.role_id} disabled={(user.role=="admin" || user.role=="user") && item.name==="Super Admin"}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Autocomplete
                            multiple
                            clearOnEscape
                            freeSolo
                            id="tags"
                            sx={{ mb: 3 }}
                            value={formData.departments.map((department_id) =>
                                dept.find((tag) => tag.department_id === department_id)
                            )}
                            options={dept.map((option) => option)}
                            onChange={HandleUserList}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select Departments"
                                    sx={{
                                        bgcolor: 'white',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            )}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                                <li {...props} key={option.department_id}>
                                    <Typography variant="subtitle2">{option.name}</Typography>
                                </li>
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option?.department_id}
                                        label={
                                            <Typography variant="subtitle2">
                                                {option?.name}
                                            </Typography>
                                        }
                                        size="small"
                                        color="info"
                                        variant="soft"
                                    />
                                ))
                            }
                        />
                        <TextField
                            multiline
                            fullWidth
                            rows={6}
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={HandleDetails}
                            sx={{ mb: 3 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={syncData} variant="contained">
                                {location.state?.userId ? 'Save' : 'Create'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
