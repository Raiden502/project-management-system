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
import { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/utils/use-boolean';
import { useNavigate } from 'react-router-dom';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button } from '@mui/material';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ProjItem({ job }) {
    const popover = usePopover();
    const confirm = useBoolean();
    const navigate = useNavigate()

    const { id, name, desc, icon, candidates, teamsize, tasks, date, status } = job;

    const editProject = (ProjectId) => {
        navigate('/dashboard/projects/create', {
            state: { ProjectId },
        });
    };

    const detailsProject = (ProjectId) => {
        navigate('/dashboard/projects/details', {
            state: { ProjectId },
        });
    };

    return (
        <>
            <Card sx={{ width: 360, position: 'relative' }}>
                <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
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
                        <Typography variant="body1">{desc}</Typography>
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
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 180 }}
            >
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        editProject('1');
                    }}
                >
                    <Iconify icon="solar:pen-bold" />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        detailsProject('1');
                    }}
                >
                    <Iconify icon="clarity:details-solid" />
                    Details
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        confirm.onTrue();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={() => {}}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}

ProjItem.propTypes = {
    job: PropTypes.object,
};
