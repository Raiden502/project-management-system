import PropTypes from 'prop-types';
import { useState, useCallback, useEffect, useRef, useContext } from 'react';
import dayjs from 'dayjs';
import { format, parse } from 'date-fns';
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
import { Autocomplete, Box, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';
import { useBoolean } from 'src/utils/use-boolean';
import TaskContactDetails from './task-contact-details';
import TaskDetailsPriority from './task-details-priority';
import TaskDetailsCommentList from './task-details-comments';
import TaskDetailsCommentInput from './task-comment-input';
import TaskInputName from './task-input-name';
import TaskDetailsToolbar from './task-item-toolbar';
import { DatePicker } from '@mui/x-date-pickers';
import Label from 'src/components/label/label';
import { useSnackbar } from 'src/components/snackbar';
import { AuthContext } from 'src/auth/JwtContext';
import { useKanban } from './hooks';

// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

// ----------------------------------------------------------------------

export default function TaskDetails({ task, openDetails, onCloseDetails, onDeleteTask, column }) {
    const { user } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const { onUpdateTask, users_list, team_list } = useKanban();
    const contactsUser = useBoolean();
    const contactsTeams = useBoolean();
    const contactsReporter = useBoolean();
    const [priority, setPriority] = useState(task?.priority);
    const [taskName, setTaskName] = useState(task?.name || '');
    const [taskDescription, setTaskDescription] = useState(task?.description || '');
    const [dueDate, setDueDate] = useState(task.due_date && new Date(task.due_date));
    const [startDate, setStartDate] = useState(task.start_date && new Date(task.start_date));
    const [reporter, setReporter] = useState(task?.reporter ? [task.reporter] : []);
    const [labels, setLabels] = useState(task?.labels ? task.labels : []);
    const [teams, setTeams] = useState(task?.teams ? task.teams : []);
    const [users, setUsers] = useState(task?.users ? task.users : []);
    const [comments, setNewComments] = useState(task?.comments ? task.comments : []);

    const handleChangeTaskName = useCallback((event) => {
        setTaskName(event.target.value);
    }, []);

    const handleChangeTaskDescription = useCallback((event) => {
        setTaskDescription(event.target.value);
    }, []);

    const handleChangePriority = useCallback((newValue) => {
        setPriority(newValue);
    }, []);

    const save_details = () => {
        if(taskName==="" || dueDate===null || startDate==null){
            enqueueSnackbar('fields are empty', { variant: 'warning' });
            return
        }
        onUpdateTask({
            priority,
            name: taskName,
            description: taskDescription,
            due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
            start_date: startDate ? format(startDate, 'yyyy-MM-dd') : null,
            reporter: reporter[0],
            labels,
            teams,
            users,
            id: task.id,
            column,
        });
    };

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
            <TaskDetailsToolbar
                taskName={task.name}
                onDelete={onDeleteTask}
                onSave={save_details}
                taskStatus={task.status}
                onCloseDetails={onCloseDetails}
            />
            <Divider />
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
                    <TaskInputName
                        placeholder="Task name"
                        value={taskName}
                        onChange={handleChangeTaskName}
                    />

                    <Stack direction="row" alignItems="center">
                        <StyledLabel>Reporter</StyledLabel>
                        {reporter.length === 0 ? (
                            <Tooltip title="Add Reporter">
                                <IconButton
                                    onClick={contactsReporter.onTrue}
                                    disabled={user.role==='user'}
                                    sx={{
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                                        border: (theme) => `dashed 1px ${theme.palette.divider}`,
                                    }}
                                >
                                    <Iconify icon="mingcute:add-line" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <>
                                {users_list
                                    .filter((item) => item.id === reporter[0])
                                    .map((item) => (
                                        <Box sx={{ m: 1, position: 'relative', p: 1 }}>
                                            <Avatar alt={item.name} src={item.avatar} />
                                            <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>
                                                {item.name}
                                            </StyledLabel>
                                            <IconButton
                                                // onClick={() => {
                                                //     HanleOnClear(user.id, 'users');
                                                // }}
                                                disabled={user.role==='user'}
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
                            </>
                        )}
                        <TaskContactDetails
                            assignee={reporter}
                            contact={users_list.filter((item) => item.role !== 'user')}
                            handleChange={(id) => {
                                setReporter([id]);
                            }}
                            open={contactsReporter.value}
                            onClose={contactsReporter.onFalse}
                        />
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Users</StyledLabel>

                        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
                            {users_list
                                .filter((item) => users.includes(item.id))
                                .map((user) => (
                                    <Avatar key={user.userid} alt={user.name} src={user.avatar} />
                                ))}

                            <Tooltip title="Add assignee">
                                <IconButton
                                    onClick={contactsUser.onTrue}
                                    disabled={user.role==='user'}
                                    sx={{
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                                        border: (theme) => `dashed 1px ${theme.palette.divider}`,
                                    }}
                                >
                                    <Iconify icon="mingcute:add-line" />
                                </IconButton>
                            </Tooltip>

                            <TaskContactDetails
                                assignee={users}
                                contact={users_list}
                                handleChange={(id) => {
                                    let temp = [...users];
                                    temp.includes(id)
                                        ? (temp = temp.filter((item) => item !== id))
                                        : temp.push(id);
                                    setUsers(temp);
                                }}
                                open={contactsUser.value}
                                onClose={contactsUser.onFalse}
                            />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Teams</StyledLabel>

                        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
                            {team_list
                                .filter((item) => teams.includes(item.id))
                                .map((user) => (
                                    <Avatar key={user.userid} alt={user.name} src={user.avatar} />
                                ))}

                            <Tooltip title="Add assignee">
                                <IconButton
                                    onClick={contactsTeams.onTrue}
                                    disabled={user.role==='user'}
                                    sx={{
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                                        border: (theme) => `dashed 1px ${theme.palette.divider}`,
                                    }}
                                >
                                    <Iconify icon="mingcute:add-line" />
                                </IconButton>
                            </Tooltip>

                            <TaskContactDetails
                                assignee={teams}
                                contact={team_list}
                                handleChange={(id) => {
                                    let temp = [...teams];
                                    temp.includes(id)
                                        ? (temp = temp.filter((item) => item !== id))
                                        : temp.push(id);
                                    setTeams(temp);
                                }}
                                open={contactsTeams.value}
                                onClose={contactsTeams.onFalse}
                            />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>
                        <Autocomplete
                            multiple
                            options={[]}
                            freeSolo
                            onChange={(e, newValue) => setLabels(newValue)}
                            value={labels}
                            renderInput={(params) => <TextField {...params} />}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Label color="info" mr={1}>
                                        <Typography variant="body2" fontSize={12} fontWeight="bold">
                                            {option}
                                        </Typography>
                                    </Label>
                                ))
                            }
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <StyledLabel> Start date </StyledLabel>
                        <DatePicker
                            value={startDate}
                            views={['year', 'month', 'day']}
                            onChange={(newValue) => setStartDate(newValue)}
                            dateFormat="MM/dd/yyyy"
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <StyledLabel> Due date </StyledLabel>
                        <DatePicker
                            value={dueDate}
                            views={['year', 'month', 'day']}
                            onChange={(newValue) => setDueDate(newValue)}
                            dateFormat="MM/dd/yyyy"
                        />
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

                {task?.comments && <TaskDetailsCommentList comments={task.comments} />}
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
