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
import ProjContactDetails from './project-contact-list';
import { useState } from 'react';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';

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

export default function ProjectCreateView() {
    const usersAssign = useBoolean();
    const teamsAssign = useBoolean();
    const [selectedImages, setSelectedImages] = useState(null);
    const [users, setUsers] = useState([...temp]);
    const [teams, setTeams] = useState([...temp]);
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

    return (
        <Grid container spacing={3}>
            <Grid
                md={4}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p:3,}}>
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
                <Button variant="contained">Create</Button>
            </Grid>
        </Grid>
    );
}
