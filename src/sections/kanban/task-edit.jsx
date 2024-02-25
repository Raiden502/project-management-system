import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';
import { useBoolean } from 'src/utils/use-boolean';
import TaskContactDetails from './task-contact-details';
import TaskDetailsPriority from './task-details-priority';
import TaskDetailsCommentList from './task-details-comments';
import TaskDetailsCommentInput from './task-comment-input';

// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

// ----------------------------------------------------------------------

export default function TaskDetails({ task, openDetails, onCloseDetails, onDeleteTask }) {
    const [priority, setPriority] = useState(task.priority);
    const [taskName, setTaskName] = useState(task.name);
    const contacts = useBoolean();
    const [taskDescription, setTaskDescription] = useState(task.description);

    const handleChangeTaskName = useCallback((event) => {
        setTaskName(event.target.value);
    }, []);

    const handleChangeTaskDescription = useCallback((event) => {
        setTaskDescription(event.target.value);
    }, []);

    const handleChangePriority = useCallback((newValue) => {
        setPriority(newValue);
    }, []);

    return (
        <Drawer
            open={openDetails}
            onClose={onCloseDetails}
            anchor="right"
            slotProps={{
                backdrop: { invisible: true },
            }}
            PaperProps={{
                sx: {
                    width: {
                        xs: 1,
                        sm: 480,
                    },
                },
            }}
        >
            <Box
                sx={{
                    height: 1,
                    '& .simplebar-content': {
                        height: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    overflowY: 'hidden', // Initially hide the scrollbar
                    '&:hover': {
                        overflowY: 'auto', // Show the scrollbar on hover
                    },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#D5CECC',
                        borderRadius: '4px',
                        height: '10px',
                    },
                }}
            >
                <Stack
                    spacing={3}
                    sx={{
                        pt: 3,
                        pb: 5,
                        px: 2.5,
                    }}
                >
                    <TextField value={taskName} onChange={handleChangeTaskName} />

                    <Stack direction="row" alignItems="center">
                        <StyledLabel>Reporter</StyledLabel>
                        <Avatar alt="reporter" src={task.reporter.avatar} />
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Assignee</StyledLabel>

                        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
                            {task.users.map((user) => (
                                <Avatar key={user.userid} alt={user.name} src={user.avatar} />
                            ))}

                            <Tooltip title="Add assignee">
                                <IconButton
                                    onClick={contacts.onTrue}
                                    sx={{
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                                        border: (theme) => `dashed 1px ${theme.palette.divider}`,
                                    }}
                                >
                                    <Iconify icon="mingcute:add-line" />
                                </IconButton>
                            </Tooltip>

                            <TaskContactDetails
                                assignee={task.users}
                                open={contacts.value}
                                onClose={contacts.onFalse}
                            />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>

                        {!!task.labels.length && (
                            <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
                                {task.labels.map((label) => (
                                    <Chip
                                        key={label}
                                        color="info"
                                        label={label}
                                        size="small"
                                        variant="soft"
                                    />
                                ))}
                            </Stack>
                        )}
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <StyledLabel> Due date </StyledLabel>
                        <Tooltip title="Add due date">
                            <IconButton
                                // onClick={}
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                                }}
                            >
                                <Iconify icon="mingcute:add-line" />
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <StyledLabel>Priority</StyledLabel>

                        <TaskDetailsPriority
                            priority={priority}
                            onChangePriority={handleChangePriority}
                        />
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel> Description </StyledLabel>

                        <TextField
                            fullWidth
                            multiline
                            size="small"
                            value={taskDescription}
                            onChange={handleChangeTaskDescription}
                            InputProps={{
                                sx: { typography: 'body2' },
                            }}
                        />
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel>Attachments</StyledLabel>
                        {/* <KanbanDetailsAttachments attachments={task.attachments} /> */}
                    </Stack>
                </Stack>

                {!!task.comments.length && <TaskDetailsCommentList comments={task.comments} />}
            </Box>

            <TaskDetailsCommentInput />
        </Drawer>
    );
}

TaskDetails.propTypes = {
    onCloseDetails: PropTypes.func,
    onDeleteTask: PropTypes.func,
    openDetails: PropTypes.bool,
    task: PropTypes.object,
};
