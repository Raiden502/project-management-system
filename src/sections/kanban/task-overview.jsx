import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Avatar, AvatarGroup, Box, Card, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

const getItems = (count, prefix) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `${prefix}-item-${k}`,
        content: `item ${k}`,
        priority: 'high',
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
        <DragDropContext onDragEnd={onDragEnd}>
            <Stack gap={3} direction="row" sx={{ m: 3 }}>
                {columns.map((column) => (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided, snapshot) => (
                            <Stack
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{
                                    background: '#f4f6f8',
                                    p: 2,
                                    width: 250,
                                    borderRadius: '8px',
                                }}
                                gap={3}
                            >
                                <Typography>{column.name}</Typography>
                                <Stack gap={2}>
                                    {column.value.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <Stack
                                                    ref={provided.innerRef}
                                                    component={Card}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: grid * 2,
                                                        background: snapshot.isDragging
                                                            ? 'transparent'
                                                            : 'white',
                                                        boxShadow: snapshot.isDragging
                                                            ? 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;'
                                                            : 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
                                                        backdropFilter: snapshot.isDragging
                                                            ? 'blur(1px)'
                                                            : 'none',
                                                        position: 'relative',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <Iconify
                                                        icon="f7:status"
                                                        sx={{
                                                            color:
                                                                (item.priority === 'high' &&
                                                                    'darkred') ||
                                                                (item.priority === 'medium' &&
                                                                    'yellow') ||
                                                                (item.priority === 'low' &&
                                                                    'green'),
                                                            position: 'absolute',
                                                            top: 8,
                                                            right: 8,
                                                        }}
                                                    />
                                                    <Typography>{item.content}</Typography>
                                                    {item.users && (
                                                        <AvatarGroup total={4}>
                                                            {item.users.map((user) => (
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src={user.avatar}
                                                                    sx={{ width: 16, height: 16 }}
                                                                />
                                                            ))}
                                                        </AvatarGroup>
                                                    )}
                                                </Stack>
                                            )}
                                        </Draggable>
                                    ))}
                                </Stack>
                                {provided.placeholder}
                            </Stack>
                        )}
                    </Droppable>
                ))}
            </Stack>
        </DragDropContext>
    );
}
