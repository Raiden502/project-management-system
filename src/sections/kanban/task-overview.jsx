import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import TaskColumn from './task-column';

const getItems = (count, prefix) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `${prefix}-${k}`,
        index: k,
        priority: 'high',
        name: `fix ui ${prefix}-${k}`,
        description: 'fix ui screens correctly',
        comments: [
            {
                userid: '1',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
                createdAt: '12-02-2023',
                messageType: 'text',
                message: 'hi everyone',
            },
            {
                userid: '2',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
                createdAt: '12-02-2023',
                messageType: 'text',
                message: 'hi everyone',
            },
            {
                userid: '3',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
                createdAt: '12-02-2023',
                messageType: 'text',
                message: 'hi everyone',
            },
        ],
        labels: ['ui', 'fronend'],
        reporter: {
            name: 'priya',
            avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
        },
        attachments: [],
        users: [
            {
                userid: '1',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_21.jpg',
            },
            {
                userid: '2',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_22.jpg',
            },
            {
                userid: '3',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_23.jpg',
            },
            {
                userid: '4',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_24.jpg',
            },
            {
                userid: '5',
                name: 'dummy',
                avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            },
        ],
    }));

export default function TaskKanbanView() {
    const [columns, setColumns] = useState([
        { id: 'task1', index: 0, name: 'To Do', value: [...getItems(3, 'task1')] },
        { id: 'task2', index: 1, name: 'In Progress', value: [...getItems(3, 'task2')] },
        { id: 'task3', index: 2, name: 'Done', value: [...getItems(3, 'task3')] },
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

        console.log({ sourceIndex, destinationIndex, sourceColumnId, destinationColumnId });

        if (result.type === 'COLUMN') {
            const reorderedColumns = reorder(updatedColumns, sourceIndex, destinationIndex);
            setColumns(reorderedColumns);
        } else {
            if (sourceColumnId === destinationColumnId) {
                const sourceColumnIndex = columns.findIndex(
                    (column) => column.id === sourceColumnId
                );
                const taskList = updatedColumns[sourceColumnIndex].value;
                const reorderedItems = reorder(taskList, sourceIndex, destinationIndex);
                updatedColumns[sourceColumnIndex].value = reorderedItems;
            } else {
                const sourceColumnIndex = columns.findIndex(
                    (column) => column.id === sourceColumnId
                );
                const destinationColumnIndex = columns.findIndex(
                    (column) => column.id === destinationColumnId
                );
                const movedItem = updatedColumns[sourceColumnIndex].value[sourceIndex];
                updatedColumns[sourceColumnIndex].value.splice(sourceIndex, 1);
                updatedColumns[destinationColumnIndex].value.splice(destinationIndex, 0, movedItem);
            }
            setColumns(updatedColumns);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                {(provided) => (
                    <Stack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            overflowX: 'scroll',
                            width: 1150,
                        }}
                        direction="row"
                        spacing={3}
                    >
                        {columns.map((column, index) => (
                            <TaskColumn column={column} index={index} />
                        ))}
                        {provided.placeholder}
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
                )}
            </Droppable>
        </DragDropContext>
    );
}
