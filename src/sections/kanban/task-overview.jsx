import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { useDispatch } from 'src/redux/store';
import { getBoard } from 'src/redux/slices/Kanban';
import { hideScroll } from 'src/theme/css';
import { useKanban } from './hooks';
import TaskColumn from './task-column';
import TaskColumnAdd from './task-column-add';

function useInitial() {
    const dispatch = useDispatch();

    const getBoardCallback = useCallback(() => {
        dispatch(getBoard());
    }, [dispatch]);

    useEffect(() => {
        getBoardCallback();
    }, [getBoardCallback]);

    return null;
}

export default function TaskKanbanView() {
    useInitial();
    const { tasks, columns, ordered, updateOrdered, updateColumns, boardStatus } = useKanban();

    const onDragEnd = useCallback(
        (result) => {
            const { destination, source, draggableId, type } = result;
            if (!destination) return;

            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            )
                return;

            if (type === 'COLUMN') {
                const newOrdered = [...ordered];
                newOrdered.splice(source.index, 1);
                newOrdered.splice(destination.index, 0, draggableId);
                updateOrdered(newOrdered);
                return;
            }

            const initialColumn = columns[source.droppableId];
            const finishColumn = columns[destination.droppableId];

            // Update Inside
            if (initialColumn.id === finishColumn.id) {
                console.info('Update Inside!');
                const updatedTaskIds = [...initialColumn.taskIds];
                updatedTaskIds.splice(source.index, 1);
                updatedTaskIds.splice(destination.index, 0, draggableId);
                const updatedColumn = {
                    ...initialColumn,
                    taskIds: updatedTaskIds,
                };
                updateColumns({
                    ...columns,
                    [updatedColumn.id]: updatedColumn,
                });
                return;
            }

            console.info('Update Outside!');
            // Initial
            const initialTaskIds = [...initialColumn.taskIds];
            initialTaskIds.splice(source.index, 1);
            const updatedStart = {
                ...initialColumn,
                taskIds: initialTaskIds,
            };
            // Finish
            const finishTaskIds = [...finishColumn.taskIds];
            finishTaskIds.splice(destination.index, 0, draggableId);
            const updatedFinish = {
                ...finishColumn,
                taskIds: finishTaskIds,
            };
            // End
            updateColumns({
                ...columns,
                [updatedStart.id]: updatedStart,
                [updatedFinish.id]: updatedFinish,
            });
        },
        [columns, ordered, updateColumns, updateOrdered]
    );

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
                        {ordered.map((columnId, index) => (
                            <TaskColumn
                                index={index}
                                key={columnId}
                                column={columns[columnId]}
                                tasks={tasks}
                            />
                        ))}
                        {provided.placeholder}
                        <TaskColumnAdd />
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
}
