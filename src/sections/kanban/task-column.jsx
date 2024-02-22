import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import TaskItem from './task-items';

export default function TaskColumn({ column, index }) {
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
                        minWidth: '280px',
                    }}
                >
                    <Stack {...provided.dragHandleProps}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                textTransform: 'capitalize',
                                color: '#212B36',
                                fontWeight: 'bold',
                            }}
                            gutterBottom
                        >
                            {column.name}
                        </Typography>
                        <Droppable droppableId={column.id} type="TASK">
                            {(dropProvided) => (
                                <Stack
                                    {...dropProvided.droppableProps}
                                    ref={dropProvided.innerRef}
                                    spacing={2}
                                    sx={{ width: 280, py: 3 }}
                                >
                                    {column.value.map((item, index) => (
                                        <TaskItem item={item} key={index}/>
                                    ))}
                                    {dropProvided.placeholder}
                                </Stack>
                            )}
                        </Droppable>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            startIcon={
                                <Iconify icon="mingcute:add-line" width={18} sx={{ mr: -0.5 }} />
                            }
                            // onClick={addTask.onToggle}
                            sx={{ fontSize: 14 }}
                        >
                            Add Task
                        </Button>
                    </Stack>
                </Paper>
            )}
        </Draggable>
    );
}
