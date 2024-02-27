import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import keyBy from 'lodash/keyBy';
import axiosInstance from 'src/utils/axios';
import uuidv4 from 'src/utils/uuidv4';

const initialState = {
    board: {
        tasks: {},
        columns: {},
        ordered: [],
    },
    boardStatus: {
        loading: false,
        empty: false,
        error: null,
    },
};

const slice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        getBoardStart(state) {
            state.boardStatus.loading = true;
            state.boardStatus.empty = false;
            state.boardStatus.error = null;
        },
        getBoardFailure(state, action) {
            state.boardStatus.loading = false;
            state.boardStatus.empty = false;
            state.boardStatus.error = action.payload;
        },
        getBoardSuccess(state, action) {
            const board = action.payload;
            const tasks = keyBy(board.tasks, 'id');
            const columns = keyBy(board.columns, 'id');
            state.boardStatus.loading = false;
            state.boardStatus.empty = !board.ordered.length;
            state.boardStatus.error = null;
            state.board = {
                tasks,
                columns,
                ordered: board.ordered,
            };
        },

        createColumnSuccess(state, action) {
            const column = action.payload;
            console.log("column",column )

            state.board.columns = {
                ...state.board.columns,
                [column.id]: column,
            };

            state.board.ordered.push(column.id);
        },

        setColumns(state, action) {
            state.board.columns = action.payload;
        },

        setOrdered(state, action) {
            state.board.ordered = action.payload;
        },

        addTask(state, action) {
            const { task, columnId } = action.payload;
            state.board.tasks[task.id] = task;
            state.board.columns[columnId].taskIds.push(task.id);
        },

        updateTasks(state, action){

        },

        deleteTask(state, action) {
            const { taskId, columnId } = action.payload;
            state.board.columns[columnId].taskIds = state.board.columns[columnId].taskIds.filter(
                (id) => id !== taskId
            );
            state.board.tasks = omit(state.board.tasks, [taskId]);
        },

        updateColumnSuccess(state, action) {
            const column = action.payload;
            state.board.columns[column.id] = column;
        },

        deleteColumnSuccess(state, action) {
            const columnId = action.payload;
            const deletedColumn = state.board.columns[columnId];
            state.board.columns = omit(state.board.columns, [columnId]);
            state.board.tasks = omit(state.board.tasks, [...deletedColumn.taskIds]);
            state.board.ordered = state.board.ordered.filter((id) => id !== columnId);
        },
    },
});

export default slice.reducer;
export const { setOrdered, setColumns} = slice.actions;

export function getBoard() {
    return async (dispatch) => {
        dispatch(slice.actions.getBoardStart());
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.kanban);
            dispatch(slice.actions.getBoardSuccess(response.data.board));
        } catch (error) {
            dispatch(slice.actions.getBoardFailure(error));
        }
    };
}

export function createColumn(newData) {
    return async (dispatch) => {
        try {
            const data = newData;
            // const response = await axiosInstance.post(API_ENDPOINTS.kanban, data, {
            //     params: {
            //         endpoint: 'create',
            //     },
            // });
            dispatch(
                slice.actions.createColumnSuccess({
                    id: `${uuidv4()}`,
                    name: newData.name,
                    taskIds: [],
                })
            );
        } catch (error) {
            console.error(error);
        }
    };
}

export function updateColumn(columnId, newData) {
    return async (dispatch) => {
        try {
            const data = {
                columnId,
                newData,
            };
            // const response = await axiosInstance.post(API_ENDPOINTS.kanban, data, {
            //     params: {
            //         endpoint: 'update',
            //     },
            // });
            dispatch(slice.actions.updateColumnSuccess(newData));
        } catch (error) {
            console.error(error);
        }
    };
}

export function deleteColumn(columnId) {
    return async (dispatch) => {
        try {
            const data = {
                columnId,
            };
            // const response = await axiosInstance.post(API_ENDPOINTS.kanban, data, {
            //     params: {
            //         endpoint: 'delete',
            //     },
            // });
            dispatch(slice.actions.deleteColumnSuccess(columnId));
        } catch (error) {
            console.error(error);
        }
    };
}


export function createTaskApi(newData) {
    return async (dispatch) => {
        try {
            const data = newData;
            // const response = await axiosInstance.post(API_ENDPOINTS.kanban, data, {
            //     params: {
            //         endpoint: 'create',
            //     },
            // });
            dispatch(
                slice.actions.addTask(newData)
            );
        } catch (error) {
            console.error(error);
        }
    };
}

export function updateTaskApi(columnId, newData) {
    return async (dispatch) => {
        try {
            const data = {
                columnId,
                newData,
            };
            // const response = await axiosInstance.post(API_ENDPOINTS.kanban, data, {
            //     params: {
            //         endpoint: 'update',
            //     },
            // });
            dispatch(slice.actions.updateTasks(newData));
        } catch (error) {
            console.error(error);
        }
    };
}

export function deleteTaskApi(columnId) {
    return async (dispatch) => {
        try {
            const data = {
                columnId,
            };
            // const response = await axiosInstance.post(API_ENDPOINTS.kanban, data, {
            //     params: {
            //         endpoint: 'delete',
            //     },
            // });
            dispatch(slice.actions.deleteTask(columnId));
        } catch (error) {
            console.error(error);
        }
    };
}


