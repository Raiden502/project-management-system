import { Box, Button, Card, Chip, ListItemText, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from 'src/components/iconify/Iconify';

export default function FullDetailsView({ department }) {
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={8}>
                <Stack component={Card} spacing={2} sx={{ p: 3 }}>
                    <Typography variant="h5">{department.title}</Typography>
                    <Typography variant="h6">Description</Typography>
                    <Typography variant="body2" sx={{ textTransform: 'none', color: '#212B36' }}>
                        {department.description}
                    </Typography>
                </Stack>
            </Grid>
            <Grid xs={12} md={4}>
                <Stack
                    component={Card}
                    spacing={2}
                    sx={{
                        p: 3,
                    }}
                >
                    {[
                        {
                            label: (
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 0.5 }}
                                >
                                    Date Posted
                                </Typography>
                            ),
                            value: `${department.datePosted}`,
                            icon: <Iconify icon="solar:calendar-date-bold" />,
                        },
                        {
                            label: (
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 0.5 }}
                                >
                                    Organization
                                </Typography>
                            ),
                            value: `${department.organization}`,
                            icon: <Iconify icon="clarity:building-solid" />,
                        },
                        {
                            label: (
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mb: 0.5 }}
                                >
                                    Department
                                </Typography>
                            ),
                            value: `${department.department}`,
                            icon: <Iconify icon="fluent:organization-20-filled" />,
                        },
                        {
                            label: `Team size`,
                            icon: <Iconify icon="ph:microsoft-teams-logo" />,
                            value: department.teams_count,
                        },
                        {
                            label: `Candidates`,
                            icon: <Iconify icon="solar:users-group-rounded-bold" />,
                            value: department.users_count,
                        },
                        {
                            label: `Tasks`,
                            icon: <Iconify icon="lets-icons:subttasks" />,
                            value: department.task_count,
                        },
                        {
                            label: `Projects`,
                            icon: <Iconify icon="fluent:status-20-filled" />,
                            value: department.project_count,
                        },
                    ].map((item) => (
                        <Stack key={item.label} spacing={1.5} direction="row">
                            {item.icon}
                            <ListItemText
                                primary={item.label}
                                secondary={item.value}
                                secondaryTypographyProps={{
                                    typography: 'subtitle2',
                                    color: 'text.primary',
                                    component: 'span',
                                }}
                            />
                        </Stack>
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}
