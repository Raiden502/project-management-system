import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Avatar, AvatarGroup, Box, Card, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import TaskItem from './task-items';

const getItems = (count, prefix) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `${prefix}-item-${k}`,
        content: `item ${k}`,
        priority: 'high',
        comments: [],
        attachments: [],
        users: [
            {
                userid: 1,
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
            },
            {
                userid: 2,
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_22.jpg',
            },
            {
                userid: 3,
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_23.jpg',
            },
            {
                userid: 4,
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
            },
            {
                userid: 5,
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            },
        ],
    }));

const grid = 8;

export default function TaskKanbanView() {
    const [columns, setColumns] = useState([
        { id: 'todo', name: 'To Do', value: [...getItems(5, 'todo')] },
        { id: 'inProgress', name: 'In Progress', value: [...getItems(5, 'inProgress')] },
        { id: 'done', name: 'Done', value: [...getItems(5, 'done')] },
        { id: 'new', name: 'New', value: [...getItems(5, 'new')] },
    ]);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const sourceColumnId = result.source.droppableId;
        const destinationColumnId = result.destination.droppableId;

        const updatedColumns = [...columns];

        if (sourceColumnId === destinationColumnId) {
            const sourceColumnIndex = columns.findIndex((column) => column.id === sourceColumnId);
            const reorderedItems = reorder(
                updatedColumns[sourceColumnIndex].value,
                sourceIndex,
                destinationIndex
            );
            updatedColumns[sourceColumnIndex].value = reorderedItems;
        } else {
            const sourceColumnIndex = columns.findIndex((column) => column.id === sourceColumnId);
            const destinationColumnIndex = columns.findIndex(
                (column) => column.id === destinationColumnId
            );
            const movedItem = updatedColumns[sourceColumnIndex].value[sourceIndex];
            updatedColumns[sourceColumnIndex].value.splice(sourceIndex, 1);
            updatedColumns[destinationColumnIndex].value.splice(destinationIndex, 0, movedItem);
        }
        setColumns(updatedColumns);
    };

    return (
        <Stack gap={3} direction="row" sx={{width: 1150, overflowX: 'scroll' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((column) => (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided, snapshot) => (
                            <Stack
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{
                                    background: '#f4f6f8',
                                    p: 2,
                                    borderRadius: '16px',
                                }}
                            >
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
                                <Stack spacing={2} sx={{ width: 280, py: 3 }}>
                                    {column.value.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <TaskItem item={item} provided={provided} />
                                            )}
                                        </Draggable>
                                    ))}
                                </Stack>
                                {provided.placeholder}
                            </Stack>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </Stack>
    );
}
