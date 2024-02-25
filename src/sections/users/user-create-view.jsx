import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import AvatarUploader from 'src/components/Image-uploader/avatar-uploader';

const formList = [
    { id: 'name', label: 'Name' },
    { id: 'password', label: 'Password' },
    { id: 'email', label: 'Email Address' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'organization', label: 'Organization' },
    { id: 'role', label: 'Role' },
];

const _tags = [
    {
        deptId: '123',
        deptname: 'aravind',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
    {
        deptId: '124',
        deptname: 'rev',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
];

export default function UsersCreateView() {
    const [contributors, setContributors] = useState([]);
    const [selectedImages, setSelectedImages] = useState(null);

    const HandleUserList = (event, emitValue) => {
        setContributors((prev) => [...emitValue.map((option) => option.deptId)]);
    };
    return (
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
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography variant="subtitle1">Email Verified</Typography>
                            <FormControlLabel
                                control={<Switch checked />}
                                onChange={(event) => {}}
                                label=""
                            />
                        </Stack>
                        <Typography variant="body2" maxWidth={600}>
                            {`Disabling this will automatically send the user a verification email`}
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
                        <TextField name={item.id} label={item.label} />
                    ))}
                </Box>
                <Autocomplete
                    multiple
                    clearOnEscape
                    freeSolo
                    id="tags"
                    sx={{ mb: 3 }}
                    value={contributors.map((deptId) => _tags.find((tag) => tag.deptId === deptId))}
                    options={_tags.map((option) => option)}
                    onChange={HandleUserList}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Select Users"
                            sx={{
                                bgcolor: 'white',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    )}
                    getOptionLabel={(option) => option.deptname}
                    renderOption={(props, option) => (
                        <li {...props} key={option.deptId}>
                            <Avatar
                                key={option.deptId}
                                alt="alt url"
                                src={option.avatar}
                                sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                            />
                            <Typography variant="subtitle2">{option.deptname}</Typography>
                        </li>
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={option.deptId}
                                label={
                                    <Typography variant="subtitle2">{option.deptname}</Typography>
                                }
                                size="small"
                                color="info"
                                variant="soft"
                                avatar={<Avatar alt={option.deptname} src={option.avatar} />}
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
                    sx={{ mb: 3 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained">Create</Button>
                </Box>
            </Grid>
        </Grid>
    );
}
