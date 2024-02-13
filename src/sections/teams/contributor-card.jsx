import { Autocomplete, Avatar, Card, Chip, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const _tags = [
    {
        userId: '123',
        username: 'aravind',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
    {
        userId: '124',
        username: 'rev',
        avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    },
];
export default function TeamContributor() {
    const [contributors, setContributors] = useState([]);
    const [teamcontributors, setTeamContributors] = useState([]);

    const HandleUserList = (event, emitValue) => {
        setContributors((prev) => [...emitValue.map((option) => option.userId)]);
    };

    const HandleTeamList = (event, emitValue) => {
        setTeamContributors((prev) => [...emitValue.map((option) => option.userId)]);
    };

    return (
        <Card sx={{ borderRadius: '15px', boxShadow: 1, position: 'relative' }}>
            <Stack gap={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                    <Typography variant="body1">Users</Typography>
                    <Autocomplete
                        multiple
                        clearOnEscape
                        freeSolo
                        id="tags"
                        value={contributors.map((userId) =>
                            _tags.find((tag) => tag.userId === userId)
                        )}
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
                        getOptionLabel={(option) => option.username}
                        renderOption={(props, option) => (
                            <li {...props} key={option.userId}>
                                <Avatar
                                    key={option.userId}
                                    alt="alt url"
                                    src={option.avatar}
                                    sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                >
                                    {option.username}
                                </Typography>
                            </li>
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option.userId}
                                    label={
                                        <Typography
                                            variant="subtitle2"
                                        >
                                            {option.username}
                                        </Typography>
                                    }
                                    size="small"
                                    color="info"
                                    variant="soft"
                                    avatar={<Avatar alt={option.username} src={option.avatar} />}
                                />
                            ))
                        }
                    />
                </Stack>
                <Stack spacing={1.5}>
                    <Typography variant="body1">Teams</Typography>
                    <Autocomplete
                        multiple
                        clearOnEscape
                        freeSolo
                        id="tags"
                        value={teamcontributors.map((userId) =>
                            _tags.find((tag) => tag.userId === userId)
                        )}
                        options={_tags.map((option) => option)}
                        onChange={HandleTeamList}
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
                        getOptionLabel={(option) => option.username}
                        renderOption={(props, option) => (
                            <li {...props} key={option.userId}>
                                <Avatar
                                    key={option.userId}
                                    alt="alt url"
                                    src={option.avatar}
                                    sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                >
                                    {option.username}
                                </Typography>
                            </li>
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option.userId}
                                    label={
                                        <Typography
                                            variant="subtitle2"
                                        >
                                            {option.username}
                                        </Typography>
                                    }
                                    size="small"
                                    color="info"
                                    variant="soft"
                                    avatar={<Avatar alt={option.username} src={option.avatar} />}
                                />
                            ))
                        }
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
