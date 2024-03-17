import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
import { useBoolean } from 'src/utils/use-boolean';
import Iconify from 'src/components/iconify/Iconify';
import Image from 'src/components/image';
import TaskDetails from './task-edit';
import { useKanban } from './hooks';

export default function TaskItem({ task, onDeleteTask, index, column }) {
    const details = useBoolean();
    const { users_list, team_list } = useKanban();
    const renderPriority = (
        <Iconify
            icon={
                (task.priority === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
                (task.priority === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
                'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                ...(task.priority === 'low' && {
                    color: 'info.main',
                }),
                ...(task.priority === 'medium' && {
                    color: 'warning.main',
                }),
                ...(task.priority === 'hight' && {
                    color: 'error.main',
                }),
            }}
        />
    );

    const renderImg = (attachments) => (
        <Box
            sx={{
                p: (theme) => theme.spacing(1, 1, 0, 1),
            }}
        >
            <Image
                disabledEffect
                alt={attachments[0].file}
                src={attachments[0].file}
                ratio="4/3"
                sx={{
                    borderRadius: 1.5,
                    ...(details.value && {
                        opacity: 0.8,
                    }),
                }}
            />
        </Box>
    );

    const renderInfo = (
        <Stack direction="row" alignItems="center">
            <Stack
                flexGrow={1}
                direction="row"
                alignItems="center"
                sx={{
                    typography: 'caption',
                    color: 'text.disabled',
                }}
            >
                <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
                <Box component="span" sx={{ mr: 1 }}>
                    {task?.comments ? task.comments.length : 0}
                </Box>

                <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
                <Box component="span">{task?.attachments ? task.attachments.length : 0}</Box>
            </Stack>

            <AvatarGroup
                sx={{
                    [`& .${avatarGroupClasses.avatar}`]: {
                        width: 24,
                        height: 24,
                    },
                }}
                max={5}
            >
                {users_list
                    .filter((item) => (task?.users ? task.users.includes(item.id) : false))
                    .map((user) => (
                        <Avatar key={user.id} alt={user.name} src={user.avatar} />
                    ))}

                {team_list
                    .filter((item) => (task?.teams ? task.teams.includes(item.id) : false))
                    .map((user) => (
                        <Avatar key={user.id} alt={user.name} src={user.avatar} />
                    ))}
            </AvatarGroup>
        </Stack>
    );
    return (
        <>
            <Draggable draggableId={task.id} index={index}>
                {(provided) => (
                    <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={details.onTrue}
                        sx={{
                            width: 1,
                            borderRadius: 1.5,
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: (theme) => theme.customShadows.z1,
                            '&:hover': {
                                boxShadow: (theme) => theme.customShadows.z20,
                            },
                            ...(details.value && {
                                boxShadow: (theme) => theme.customShadows.z20,
                            }),
                        }}
                    >
                        {task?.attachments?.length > 0 && renderImg(task?.attachments)}

                        <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
                            {renderPriority}

                            <Typography variant="subtitle2">{task.name}</Typography>

                            {renderInfo}
                        </Stack>
                    </Paper>
                )}
            </Draggable>
            <TaskDetails
                task={task}
                column={column}
                openDetails={details.value}
                onCloseDetails={details.onFalse}
                onDeleteTask={() => onDeleteTask(task.id)}
            />
        </>
    );
}
