// @mui
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify/Iconify';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function CandidateDetails({candidates}) {
    return (
        <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
            }}
        >
            {candidates.map((candidate, index) => (
                <Stack
                    component={Card}
                    direction="row"
                    spacing={2}
                    key={index}
                    sx={{ p: 3, position: 'relative' }}
                >
                    <Avatar
                        alt={candidate.name}
                        src={candidate.avatarUrl}
                        sx={{ width: 48, height: 48 }}
                    />

                    <Stack spacing={2}>
                        <ListItemText
                            primary={<Typography variant="body2">{candidate.name}</Typography>}
                            secondary={
                                <Typography
                                    variant="caption"
                                    component="span"
                                    sx={{ color: 'text.disabled', mt: 0.5 }}
                                >
                                    {candidate.role}
                                </Typography>
                            }
                        />

                        <Stack spacing={1} direction="row">
                            <IconButton
                                size="small"
                                color="error"
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                                    '&:hover': {
                                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
                                    },
                                }}
                            >
                                <Iconify width={18} icon="solar:phone-bold" />
                            </IconButton>

                            <IconButton
                                size="small"
                                color="info"
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                                    '&:hover': {
                                        bgcolor: (theme) => alpha(theme.palette.info.main, 0.16),
                                    },
                                }}
                            >
                                <Iconify width={18} icon="solar:chat-round-dots-bold" />
                            </IconButton>

                            <IconButton
                                size="small"
                                color="primary"
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                    '&:hover': {
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                                    },
                                }}
                            >
                                <Iconify width={18} icon="fluent:mail-24-filled" />
                            </IconButton>

                            <Tooltip title="Download CV">
                                <IconButton
                                    size="small"
                                    color="secondary"
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: (theme) =>
                                            alpha(theme.palette.secondary.main, 0.08),
                                        '&:hover': {
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.secondary.main, 0.16),
                                        },
                                    }}
                                >
                                    <Iconify width={18} icon="eva:cloud-download-fill" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
            ))}
        </Box>
    );
}

CandidateDetails.propTypes = {
    candidates: PropTypes.array,
};
