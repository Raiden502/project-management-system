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
    MenuItem,
    Autocomplete,
    Chip,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, alpha } from '@mui/material/styles';
import { useBoolean } from 'src/utils/use-boolean';
import Iconify from 'src/components/iconify/Iconify';
import ProjContactDetails from './project-contact-list';
import { useContext, useEffect, useRef, useState } from 'react';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';
import Label from 'src/components/label';
import { AuthContext } from 'src/auth/JwtContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { useSelector } from 'src/redux/store';

const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

export default function ProjectCreateView() {
    const usersAssign = useBoolean();
    const teamsAssign = useBoolean();
    const { user } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const department = useSelector((state) => state.department);
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState(null);
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        status: '',
        avatar: '',
        tools: [],
        links: [],
        users: [],
        teams: [],
    });

    const HandleFormdata = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const HandleTools = (event, emitvalue) => {
        setFormData((prev) => ({ ...prev, tools: emitvalue }));
    };

    const HandleLinks = () => {
        setFormData((prev) => ({ ...prev, links: [...prev.links, inputValue] }));
    };

    const HanleLinksDelete = (index) => {
        console.log(index);
        const newArray = [...formData.links];
        newArray.splice(index, 1);
        setFormData((prev) => ({ ...prev, links: newArray }));
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

    const fetchList = async () => {
        try {
            const response = await axiosInstance.post('/proj/proj_contacts', {
                dept_id: department.department_id,
            });
            const { data, errorcode, status, message } = response.data;
            if (errorcode === 0) {
                const { users, teams } = data;
                setUsers(users);
                setTeams(teams);
                console.log("list", data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createDept = async () => {
        try {
            const response = await axiosInstance.post('/proj/proj_create', {
                ...formData,
                org_id: user.org_id,
                dept_id: department.department_id,
                user_id: user.user_id,
                avatar: selectedImages,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/dashboard/projects/list');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    const editProject = async () => {
        try {
            const response = await axiosInstance.post('/proj/proj_edit', {
                ...formData,
                project_id: location.state.projectId,
                department_id: location.state.department_id,
                avatar: selectedImages,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('details saved successful', { variant: 'success' });
                console.log(message);
                navigate('/dashboard/projects/list');
            } else {
                enqueueSnackbar(' failed to saved', { variant: 'warning' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Unable to save', { variant: 'error' });
        }
    };

    const fetchFormData = async () => {
        try {
            const response = await axiosInstance.post('/proj/get_proj_editform', {
                proj_id: location.state.projectId,
            });
            const { errorcode, status, message, data } = response.data;
            if (errorcode === 0) {
                setFormData(data)
                setSelectedImages(data.avatar)
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

    const secondRender = useRef(true);
    useEffect(() => {
        if (secondRender.current && location.state?.projectId) {
            fetchFormData();
            secondRender.current = false;
        }
    }, [location.state?.projectId]);

    console.log(formData);

    return (
        <Grid container spacing={3}>
            <Grid md={4}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 3,
                        mb: 3,
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
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 3,
                    }}
                >
                    <TextField
                        value={inputValue}
                        label = "Links"
                        onChange={(e) => setInputValue(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Button variant="contained" onClick={HandleLinks}>
                                    Add
                                </Button>
                            ),
                        }}
                    />
                    <Stack gap={1} mt={2}>
                        {formData.links.map((item, index) => (
                            <Chip
                                label={item}
                                color="info"
                                variant="soft"
                                // variant="outlined"
                                onDelete={() => HanleLinksDelete(index)}
                            />
                        ))}
                    </Stack>
                </Card>
            </Grid>
            <Grid xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <TextField
                            name="name"
                            label="Project Name"
                            value={formData.name}
                            onChange={HandleFormdata}
                            placeholder="e.g., Department Name"
                        />
                        <TextField
                            multiline
                            rows={6}
                            maxRows={10}
                            label="Description"
                            name="desc"
                            value={formData.desc}
                            onChange={HandleFormdata}
                            placeholder="description"
                        />

                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={HandleFormdata}
                        >
                            {[
                                'Design',
                                'Development',
                                'Testing',
                                'Analysis',
                                'Maintenance',
                                'Documentation',
                                'Iteration',
                                'Proto Type',
                                'Deployment',
                            ].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={[]}
                            freeSolo
                            onChange={HandleTools}
                            value={formData.tools}
                            renderInput={(params) => <TextField {...params} label="Tools" />}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Label color="info" mr={1}>
                                        <Typography variant="body2" fontSize={12} fontWeight="bold">
                                            {option}
                                        </Typography>
                                    </Label>
                                ))
                            }
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

                                <ProjContactDetails
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
                            <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Teams</StyledLabel>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
                                {teams
                                    .filter((item) => formData.teams.includes(item.id))
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

                                <ProjContactDetails
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
                    onClick={location.state?.projectId ? editProject : createDept}
                    variant="contained"
                >
                    {location.state?.projectId ? 'Save' : 'Create'}
                </Button>
            </Grid>
        </Grid>
    );
}
