import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import TaskItem from './task-items';
import RowAdd from './task-row-add';

export default function TaskColumn({ column, setTaskData, tasks}) {
    return (
        <Draggable draggableId={`${column.index}`} index={column.index} key={column.index}>
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
                        <Typography variant="subtitle1" sx={{}} gutterBottom>
                            {column.type}
                        </Typography>
                        <Droppable droppableId={column.id} type="TASK">
                            {(dropProvided) => (
                                <Stack
                                    {...dropProvided.droppableProps}
                                    ref={dropProvided.innerRef}
                                    spacing={2}
                                    sx={{ width: 280, py: 3 }}
                                >
                                    {tasks && tasks.map((item, index2) => (
                                        <TaskItem item={item} key={item.id}/>
                                    ))}
                                    {dropProvided.placeholder}
                                </Stack>
                            )}
                        </Droppable>
                        <RowAdd setTaskData={setTaskData} taskId={column.id} taskData={tasks}/>
                    </Stack>
                </Paper>
            )}
        </Draggable>
    );
}
