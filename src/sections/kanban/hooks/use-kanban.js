import { useCallback } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import {
    setOrdered,
    setColumns,
    deleteTaskApi,
    updateTaskApi,
    createColumn,
    updateColumn,
    deleteColumn,
    createTaskApi,
} from 'src/redux/slices/Kanban';

// ----------------------------------------------------------------------

export default function useKanban() {
    const dispatch = useDispatch();

    const { board, boardStatus } = useSelector((state) => state.kanban);

    const { tasks, columns, ordered } = board;

    const updateOrdered = useCallback(
        (newOrder) => {
            dispatch(setOrdered(newOrder));
        },
        [dispatch]
    );

    const updateColumns = useCallback(
        (newColumns) => {
            dispatch(setColumns(newColumns));
        },
        [dispatch]
    );

    const onAddTask = useCallback(
        ({ task, columnId }) => {
            dispatch(createTaskApi({ task, columnId }));
        },
        [dispatch]
    );

    const onDeleteTask = useCallback(
        ({ taskId, columnId }) => {
            dispatch(deleteTaskApi({ taskId, columnId }));
        },
        [dispatch]
    );

    const onUpdateTask = useCallback(
        ({ task, columnId }) => {
            dispatch(updateTaskApi({ task, columnId }));
        },
        [dispatch]
    );

    const onCreateColumn = useCallback(
        ({ name }) => {
            dispatch(createColumn({ name }));
        },
        [dispatch]
    );

    const onUpdateColumn = useCallback(
        (columnId, newData) => {
            dispatch(updateColumn(columnId, newData));
        },
        [dispatch]
    );

    const onDeleteColumn = useCallback(
        (columnId) => {
            dispatch(deleteColumn(columnId));
        },
        [dispatch]
    );

    return {
        tasks,
        columns,
        ordered,
        //
        updateColumns,
        updateOrdered,
        //
        onAddTask,
        onDeleteTask,
        onCreateColumn,
        onUpdateColumn,
        onDeleteColumn,
        boardStatus,
    };
}
