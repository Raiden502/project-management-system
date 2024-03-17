import {
    Card,
    Stack,
    TextField,
    Typography,
    Box,
    Button,
    Tooltip,
    IconButton,
    Avatar,
    Backdrop,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, alpha } from '@mui/material/styles';
import { useBoolean } from 'src/utils/use-boolean';
import Iconify from 'src/components/iconify/Iconify';
import DeptContactDetails from './department-contact-list';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';
import { AuthContext } from 'src/auth/JwtContext';
import axiosInstance from 'src/utils/axios';
import { useSelector } from 'src/redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingScreen } from 'src/components/loading-screen';

const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

export default function DepartmentCreateView() {
    const usersAssign = useBoolean();
    const teamsAssign = useBoolean();
    const loading = useBoolean();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const department = useSelector((state) => state.department);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedImages, setSelectedImages] = useState(null);
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        deptname: '',
        deptdesc: '',
        avatar: '',
        users: [],
        teams: [],
    });

    const HandleFormdata = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const HandleUserData = (id, type) => {
        const current_data = [...formData[type]];
        if (!current_data.includes(id)) {
            current_data.push(id);
            setFormData((prev) => ({ ...prev, [type]: current_data }));
        }
    };

    const HanleOnClear = (id, type) => {
        const current_data = [...formData[type]];
        if (current_data.includes(id)) {
            setFormData((prev) => ({ ...prev, [type]: current_data.filter((item) => item != id) }));
        }
    };

    const fetchFormData = async () => {
        try {
            loading.onTrue()
            const response = await axiosInstance.post('/dept/get_dept_editdetails', {
                dept_id: location.state?.departmentId,
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                console.log(data);
                setFormData(data);
                setSelectedImages(data?.avatar);
            }
        } catch (err) {
            console.log(err);
        }
        finally{
            loading.onFalse()
        }
    };

    const createDept = async () => {
        try {
            loading.onTrue()
            const response = await axiosInstance.post('/dept/create_dept', {
                ...formData,
                org_id: user.org_id,
                user_id: user.user_id,
                avatar: selectedImages,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/dashboard/departments/list');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
        finally{
            loading.onFalse()
        }
    };

    const editDept = async () => {
        try {
            loading.onTrue()
            const response = await axiosInstance.post('/dept/edit_dept', {
                ...formData,
                department_id: location.state?.departmentId,
                avatar: selectedImages,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/dashboard/departments/list');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
        finally{
            loading.onFalse()
        }
    };

    const fetchList = async () => {
        try {
            const response = await axiosInstance.post('/dept/get_dept_contacts', {
                org_id: user.org_id,
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                const { users, teams } = data;
                const super_admin = users
                    .filter((item) => item.role === 'super_admin')
                    .map((item) => item.id);
                setFormData((prev) => ({
                    ...prev,
                    users: super_admin,
                }));
                setUsers(users);
                setTeams(teams);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            fetchList();
            firstRender.current = false;
        }
    }, [location.state?.departmentId, users, formData.users]);

    const secRender = useRef(true);
    useEffect(() => {
        if (secRender.current && location.state?.departmentId) {
            fetchFormData();
            secRender.current = false;
        }
    }, [location.state?.departmentId]);

    console.log(users, formData);
    return (
        <>
            <Backdrop open={loading.value}>
                <LoadingScreen />
            </Backdrop>

            <Grid container spacing={3}>
                <Grid md={4}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: 3,
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
                        </Stack>
                    </Card>
                </Grid>
                <Grid xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <TextField
                                name="deptname"
                                label="Department Name"
                                value={formData.deptname}
                                onChange={HandleFormdata}
                                placeholder="e.g., Department Name"
                            />
                            <TextField
                                multiline
                                rows={6}
                                maxRows={10}
                                label="Description"
                                name="deptdesc"
                                value={formData.deptdesc}
                                onChange={HandleFormdata}
                                placeholder="description"
                            />

                            <Stack direction="row">
                                <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>
                                    Assignee
                                </StyledLabel>
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    {users
                                        .filter((item) => formData.users.includes(item.id))
                                        .map((userinfo) => (
                                            <Box
                                                sx={{
                                                    m: 1,
                                                    position: 'relative',
                                                    p: 1,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Avatar
                                                    key={userinfo.userid}
                                                    alt={userinfo.name}
                                                    src={userinfo.avatar}
                                                />
                                                <StyledLabel
                                                    sx={{ height: 40, lineHeight: '40px' }}
                                                >
                                                    {userinfo.name}
                                                </StyledLabel>
                                                <IconButton
                                                    onClick={() => {
                                                        HanleOnClear(userinfo.id, 'users');
                                                    }}
                                                    disabled={userinfo.role === 'super_admin'}
                                                    sx={{
                                                        top: 2,
                                                        right: 2,
                                                        position: 'absolute',
                                                        backgroundColor: '#212B36',
                                                        color: 'white',
                                                        p: 0.5,
                                                    }}
                                                >
                                                    <Iconify icon="ic:round-close" width={8} />
                                                </IconButton>
                                            </Box>
                                        ))}

                                    <Tooltip title="Add assignee">
                                        <IconButton
                                            onClick={usersAssign.onTrue}
                                            sx={{
                                                bgcolor: (theme) =>
                                                    alpha(theme.palette.grey[500], 0.08),
                                                border: (theme) =>
                                                    `dashed 1px ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Iconify icon="mingcute:add-line" />
                                        </IconButton>
                                    </Tooltip>

                                    <DeptContactDetails
                                        assignee={formData.users}
                                        open={usersAssign.value}
                                        onClose={usersAssign.onFalse}
                                        type="users"
                                        handleChange={HandleUserData}
                                        contacts={users}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row">
                                <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>
                                    Teams
                                </StyledLabel>
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    {teams
                                        .filter((item) => formData.teams.includes(item.id))
                                        .map((user) => (
                                            <Box sx={{ m: 1, position: 'relative', p: 1 }}>
                                                <Avatar
                                                    key={user.userid}
                                                    alt={user.name}
                                                    src={user.avatar}
                                                />
                                                <StyledLabel
                                                    sx={{ height: 40, lineHeight: '40px' }}
                                                >
                                                    {user.name}
                                                </StyledLabel>
                                                <IconButton
                                                    onClick={() => {
                                                        HanleOnClear(user.id, 'teams');
                                                    }}
                                                    sx={{
                                                        top: 2,
                                                        right: 2,
                                                        position: 'absolute',
                                                        backgroundColor: '#212B36',
                                                        color: 'white',
                                                        p: 0.5,
                                                    }}
                                                >
                                                    <Iconify icon="ic:round-close" width={8} />
                                                </IconButton>
                                            </Box>
                                        ))}

                                    <Tooltip title="Add assignee">
                                        <IconButton
                                            onClick={teamsAssign.onTrue}
                                            sx={{
                                                bgcolor: (theme) =>
                                                    alpha(theme.palette.grey[500], 0.08),
                                                border: (theme) =>
                                                    `dashed 1px ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Iconify icon="mingcute:add-line" />
                                        </IconButton>
                                    </Tooltip>

                                    <DeptContactDetails
                                        assignee={formData.teams}
                                        open={teamsAssign.value}
                                        onClose={teamsAssign.onFalse}
                                        type="teams"
                                        handleChange={HandleUserData}
                                        contacts={teams}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
                <Grid xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={location.state?.departmentId ? editDept : createDept}
                        variant="contained"
                    >
                        {location.state?.departmentId ? 'Save' : 'Create'}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
