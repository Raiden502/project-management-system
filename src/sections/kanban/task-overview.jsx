import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import TaskColumn from './task-column';
import ColumnAdd from './task-column-add';

export default function TaskKanbanView() {
    const [columns, setColumns] = useState([
        { id: 'T1', index: 0, type: 'To Do' },
        { id: 'T2', index: 1, type: 'In Progress' },
        { id: 'T3', index: 2, type: 'Done' },
    ]);

    const [taskData, setTaskData] = useState({
        T1: [],
        T2: [],
        T3: [],
    });

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
        const updatedRows = { ...taskData };

        console.log({ sourceIndex, destinationIndex, sourceColumnId, destinationColumnId });

        if (result.type === 'COLUMN') {
            const [removed] = updatedColumns.splice(sourceIndex, 1);
            updatedColumns.splice(destinationIndex, 0, removed);
            setColumns(updatedColumns);
            return;
        }
        if (sourceColumnId === destinationColumnId) {
            const [removed] = updatedRows[sourceColumnId].splice(sourceIndex, 1);
            updatedRows[sourceColumnId].splice(destinationIndex, 0, removed);
        } else {
            const movedItem = updatedRows[sourceColumnId][sourceIndex];
            updatedRows[sourceColumnId].splice(sourceIndex, 1);
            updatedRows[destinationColumnId].splice(destinationIndex, 0, movedItem);
        }
        setTaskData((prevItem) => ({ ...updatedRows }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                {(provided) => (
                    <Stack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            width: 1150,
                            py: 3,
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
                        direction="row"
                        spacing={3}
                    >
                        {columns.map((column) => (
                            <TaskColumn
                                column={column}
                                tasks={taskData[column.id]}
                                setTaskData={setTaskData}
                            />
                        ))}
                        {provided.placeholder}
                        <ColumnAdd setColumns={setColumns} />
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
}
