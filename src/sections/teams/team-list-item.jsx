// @mui
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify/Iconify';
import { RouterLink } from 'src/routes/components';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function TeamItem({ job }) {
    // const popover = usePopover();

    const { id, name, desc, icon, candidates, teamsize, tasks, date, status } = job;

    return (
        <>
            <Card sx={{ borderRadius: '15px', boxShadow:'rgba(149, 157, 165, 0.1) 0px 8px 24px', width: 360, position: 'relative' }}>
                <IconButton onClick={() => {}} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>

                <Stack sx={{ p: 3, pb: 2 }}>
                    <Avatar
                        alt={'asas'}
                        src={icon}
                        variant="rounded"
                        sx={{ width: 48, height: 48, mb: 2 }}
                    />

                    <ListItemText
                        sx={{ mb: 1 }}
                        primary={
                            <Link
                                component={RouterLink}
                                // href={paths.dashboard.job.details(id)}
                                color="inherit"
                                underline="none"
                            >
                                {name}
                            </Link>
                        }
                        secondary={`Posted date: ${date}`}
                        primaryTypographyProps={{
                            typography: 'subtitle1',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                        secondaryTypographyProps={{
                            mt: 1,
                            component: 'span',
                            typography: 'caption',
                            color: 'text.disabled',
                        }}
                    />

                    {/* <Typography>{desc}</Typography> */}
                    <Box
                        sx={{
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}
                    >
                        <Typography>{desc}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                    {[
                        {
                            label: `${teamsize} team size`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="ph:microsoft-teams-logo"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                        {
                            label: `${candidates} candidates`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="solar:users-group-rounded-bold"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                        {
                            label: `${tasks} tasks`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="lets-icons:subttasks"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                        {
                            label: status,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="fluent:status-20-filled"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                    ].map((item) => (
                        <Stack
                            key={item.label}
                            spacing={1}
                            flexShrink={0}
                            direction="row"
                            alignItems="center"
                            sx={{ color: 'text.disabled', minWidth: 1 }}
                        >
                            {item.icon}
                            <Typography variant="caption" noWrap>
                                {item.label}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
            </Card>
        </>
    );
}

TeamItem.propTypes = {
    job: PropTypes.object,
};
