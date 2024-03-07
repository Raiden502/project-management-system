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
import { useSnackbar } from 'src/components/snackbar';
import { RouterLink } from 'src/routes/components';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button } from '@mui/material';
import CustomPopover from 'src/components/custom-popover/custom-popover';
import { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/utils/use-boolean';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/JwtContext';
import axiosInstance from 'src/utils/axios';
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function TeamItem({ job }) {
    const popover = usePopover();
    const confirm = useBoolean();
    const navigate = useNavigate();
    const department = useSelector((state) => state.department);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useContext(AuthContext);
    const { team_id, name, description, avatar, user_count, date } = job;

    const editTeams = () => {
        navigate('/dashboard/teams/create', {
            state: { teamsId: team_id },
        });
    };

    const detailsTeams = () => {
        navigate('/dashboard/teams/details', {
            state: { teamsId: team_id },
        });
    };

    const delete_team = async () => {
        try {
            const response = await axiosInstance.post('/team/team_delete', {
                team_id: team_id,
                dept_id: department.department_id,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('delete successful', { variant: 'success' });
            } else {
                enqueueSnackbar('delete unsuccesful', { variant: 'warning' });
            }
        } catch (err) {
            enqueueSnackbar('Failed to delete', { variant: 'error' });
        } finally {
            confirm.onFalse();
        }
    };

    return (
        <>
            <Card sx={{ width: 360, position: 'relative' }}>
                <IconButton
                    onClick={popover.onOpen}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>

                <Stack sx={{ p: 3, pb: 2 }}>
                    <Avatar
                        alt={'asas'}
                        src={avatar}
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
                        <Typography variant="body1">{description}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                    <Stack
                        key={`${user_count} team size`}
                        spacing={1}
                        flexShrink={0}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'text.disabled', minWidth: 1 }}
                    >
                        <Iconify width={16} icon="ph:microsoft-teams-logo" sx={{ flexShrink: 0 }} />
                        <Typography variant="caption" noWrap>
                            {`${user_count} team size`}
                        </Typography>
                    </Stack>
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
                        editTeams();
                    }}
                    disabled={user.role === 'user'}
                >
                    <Iconify icon="solar:pen-bold" />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        detailsTeams();
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
                    disabled={user.role === 'user'}
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
                    <Button variant="contained" color="error" onClick={delete_team}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}

TeamItem.propTypes = {
    job: PropTypes.object,
};
