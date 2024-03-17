import { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper, TextField, MenuItem, Backdrop } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { useDispatch, useSelector } from 'src/redux/store';
import { hideScroll } from 'src/theme/css';
import { useKanban } from './hooks';
import TaskColumn from './task-column';
import TaskColumnAdd from './task-column-add';
import EmptyContent from 'src/components/empty-content/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { useBoolean } from 'src/utils/use-boolean';

export default function TaskKanbanView() {
    const dispatch = useDispatch();
    const firstRender = useRef(true);
    const secondRender = useRef(true);
    const department = useSelector((state) => state.department);
    const {
        tasks,
        columns,
        ordered,
        updateOrdered,
        updateColumns,
        boardStatus,
        currentProject,
        projects,
        onBoardChange,
        onChangeProject,
        fetchProjects,
        loading,
    } = useKanban();

    const getProjectCallback = () => {
        dispatch(fetchProjects());
    };

    useEffect(() => {
        if (firstRender.current && department?.department_id) {
            getProjectCallback();
            firstRender.current = false;
        }
    }, [getProjectCallback, department.department_id]);

    useEffect(() => {
        if (secondRender.current && currentProject) {
            onBoardChange();
            secondRender.current = false;
        }
    }, [getProjectCallback, currentProject]);

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
        <>
            <Backdrop open={loading.value}>
                <LoadingScreen />
            </Backdrop>
            <TextField
                fullWidth
                select
                label="Projects"
                name="Projects"
                value={currentProject}
                onChange={onChangeProject}
                sx={{ maxWidth: '300px' }}
            >
                {projects.map((item) => (
                    <MenuItem key={item.project_id} value={item.project_id}>
                        {item.name}
                    </MenuItem>
                ))}
            </TextField>
            {(currentProject === null || ordered.length === 0) && <EmptyContent title="No Data" />}
            {currentProject && ordered.length !== 0 && (
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
            )}
        </>
    );
}
