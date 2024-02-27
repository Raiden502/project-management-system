import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/utils/use-boolean';
import TaskItem from './task-items';
import { useKanban } from './hooks';
import TaskAdd from './task-row-add';
import TaskColumnToolBar from './task-column-toolbar';

export default function TaskColumn({ column, index, tasks }) {
    const { enqueueSnackbar } = useSnackbar();
    const { onUpdateColumn, onDeleteColumn, onAddTask, onDeleteTask } = useKanban();

    const addTask = useBoolean();

    const handleDeleteTask = useCallback(
        (taskId) => {
            onDeleteTask({
                taskId,
                columnId: column.id,
            });
            enqueueSnackbar('Delete success!');
        },

        [column.id, onDeleteTask]
    );

    const handleUpdateColumn = useCallback(
        (newName) => {
            try {
                if (newName !== column.name) {
                    onUpdateColumn(column.id, {
                        ...column,
                        name: newName,
                    });
                    enqueueSnackbar('Update success!');
                }
            } catch (error) {
                console.error(error);
            }
        },

        [column, onUpdateColumn]
    );

    const handleDeleteColumn = useCallback(async () => {
        try {
            onDeleteColumn(column.id);
            enqueueSnackbar('Delete success!');
        } catch (error) {
            console.error(error);
        }
    }, [column.id, onDeleteColumn]);

    const handleAddTask = useCallback((task) => {
        addTask.onFalse();
        onAddTask({
            task,
            columnId: column.id,
        });
    }, []);

    const renderAddTask = (
        <Stack spacing={2} sx={{ pb: 3 }}>
            {addTask.value && (
                <TaskAdd
                    status={column.name}
                    onAddTask={handleAddTask}
                    onCloseAddTask={addTask.onFalse}
                />
            )}

            <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Iconify icon="mingcute:add-line" width={18} sx={{ mr: -0.5 }} />}
                onClick={addTask.onToggle}
                sx={{ fontSize: 14 }}
            >
                Add Task
            </Button>
        </Stack>
    );
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Paper
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    sx={{
                        background: '#f4f6f8',
                        p: 2,
                        borderRadius: '16px',
                        minWidth: '315px',
                    }}
                >
                    <Stack {...provided.dragHandleProps}>
                        <TaskColumnToolBar
                            columnName={column.name}
                            onDelete={handleDeleteColumn}
                            onUpdate={handleUpdateColumn}
                        />
                        <Droppable droppableId={column.id} type="TASK">
                            {(dropProvided) => (
                                <Stack
                                    {...dropProvided.droppableProps}
                                    ref={dropProvided.innerRef}
                                    spacing={2}
                                    sx={{ width: 280, py: 3 }}
                                >
                                    {column.taskIds.map((taskId, taskIndex) => (
                                        <TaskItem
                                            key={taskId}
                                            index={taskIndex}
                                            task={tasks[taskId]}
                                            onDeleteTask={handleDeleteTask}
                                        />
                                    ))}
                                    {dropProvided.placeholder}
                                </Stack>
                            )}
                        </Droppable>
                        {renderAddTask}
                    </Stack>
                </Paper>
            )}
        </Draggable>
    );
}
