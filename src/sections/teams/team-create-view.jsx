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
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, alpha } from '@mui/material/styles';
import { useBoolean } from 'src/utils/use-boolean';
import Iconify from 'src/components/iconify/Iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useContext, useEffect, useRef, useState } from 'react';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';
import TeamContactDetails from './team-contact-list';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/auth/JwtContext';
import axiosInstance from 'src/utils/axios';
import { useSelector } from 'src/redux/store';

const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

const temp = [
    {
        id: '1',
        name: 'dummy',
        email: 'dummy@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
    },
    {
        id: '2',
        name: 'dummy',
        email: 'dummy@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_22.jpg',
    },
    {
        id: '3',
        name: 'dummy',
        email: 'dummy@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_23.jpg',
    },
    {
        id: '4',
        name: 'dummy',
        email: 'dummy@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
    },
    {
        id: '5',
        name: 'dummy',
        email: 'dummy@gmail.com',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
];

export default function TeamCreateView() {
    const usersAssign = useBoolean();
    const teamsAssign = useBoolean();
    const { user } = useContext(AuthContext);
    const [selectedImages, setSelectedImages] = useState(null);
    const department = useSelector((state) => state.department);
    const location = useLocation();
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
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
            const response = await axiosInstance.post('/team/team_formdetails', {
                team_id: location.state?.teamsId,
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setFormData(data);
                setSelectedImages(data?.avatar);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createDept = async () => {
        try {
            const response = await axiosInstance.post('/team/team_create', {
                ...formData,
                org_id: user.org_id,
                dept_id:department.department_id,
                user_id: user.user_id,
                avatar: selectedImages,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/dashboard/teams/list');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    const editDept = async () => {
        try {
            const response = await axiosInstance.post('/team/team_edit', {
                ...formData,
                team_id: location.state?.teamsId,
                avatar: selectedImages,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/dashboard/teams/list');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    const fetchList = async () => {
        try {
            const response = await axiosInstance.post('/team/team_contacts', {
                dept_id: department.department_id,
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                setUsers(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && department.department_id) {
            fetchList();
            firstRender.current = false;
        }
    }, [department.department_id]);

    const secRender = useRef(true);
    useEffect(() => {
        if (secRender.current && location.state?.teamsId) {
            fetchFormData();
            secRender.current = false;
        }
    }, [location.state?.teamsId]);

    return (
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
                            name="name"
                            label="Department Name"
                            value={formData.name}
                            onChange={HandleFormdata}
                            placeholder="e.g., Department Name"
                        />
                        <TextField
                            multiline
                            rows={6}
                            maxRows={10}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={HandleFormdata}
                            placeholder="description"
                        />

                        <Stack direction="row">
                            <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>
                                Assignee
                            </StyledLabel>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
                                {users
                                    .filter((item) => formData.users.includes(item.id))
                                    .map((user) => (
                                        <Box sx={{ m: 1, position: 'relative', p: 1 }}>
                                            <Avatar
                                                key={user.userid}
                                                alt={user.name}
                                                src={user.avatar}
                                            />
                                            <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>
                                                {user.name}
                                            </StyledLabel>
                                            <IconButton
                                                onClick={() => {
                                                    HanleOnClear(user.id, 'users');
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

                                <TeamContactDetails
                                    assignee={formData.users}
                                    open={usersAssign.value}
                                    onClose={usersAssign.onFalse}
                                    type="users"
                                    handleChange={HandleUserData}
                                    contacts={users}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
            <Grid xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={location.state?.teamsId ? editDept : createDept}
                    variant="contained"
                >
                    {location.state?.teamsId ? 'Save' : 'Create'}
                </Button>
            </Grid>
        </Grid>
    );
}
