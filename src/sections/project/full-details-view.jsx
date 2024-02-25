import { Box, Button, Card, Chip, ListItemText, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from 'src/components/iconify/Iconify';

export default function FullDetailsView() {
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={8}>
                <Stack
                    component={Card}
                    spacing={2}
                    sx={{
                        p: 3,
                    }}
                >
                    <Typography variant="h5" sx={{}}>
                        Project Title
                    </Typography>
                    <Typography variant="h6" sx={{}}>
                        Project Description
                    </Typography>
                    <Typography variant="body2">
                        In any organisation there are number of tasks which are not needed to be
                        executed in real time like data sync, report generation, reconciliation of
                        payments etc. These tasks can be executed in background in scheduled manner
                        and this dramatically increases the overall performance of the system by
                        segregating the time consuming and resource intensive processes. But these
                        background tasks are prone to failure and thus some retrying mechanisms are
                        needed for such jobs. Usually there are number of micro-services in a system
                        and many of them will need these type of background jobs at some point or
                        the other. But building this mechanism in all the services will lead to lot
                        of boiler plate code in the services and will also require a lot of
                        development and maintenance effort. So the need arises to build a
                        centralised system which can handle scheduling such type of jobs in generic
                        manner. Some of the common requirements that should be taken into
                        consideration while building such system are:
                    </Typography>
                    <Stack spacing={2}>
                        <Typography variant="h6">Tools</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip
                                key={0}
                                label={<Typography variant="body2">UI</Typography>}
                                variant="soft"
                            />
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography variant="h6">Links</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip
                                key={0}
                                label={<Typography variant="body2">UI</Typography>}
                                variant="soft"
                            />
                        </Stack>
                    </Stack>
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
                            value: '12-09-67',
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
                            value: '12-09-67',
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
                            value: '12-09-67',
                            icon: <Iconify icon="fluent:organization-20-filled" />,
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
