import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import keyBy from 'lodash/keyBy';

const initialState = {
    projects: [],
    currentProject: null,
    users_list:[],
    team_list:[],
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

        setProjects(state, action) {
            state.projects = action.payload;
        },

        setProjectMembers(state, action) {
            state.users_list = action.payload.users;
            state.team_list = action.payload.teams
        },

        changeProject(state, action) {
            state.currentProject = action.payload;
        },

        createColumnSuccess(state, action) {
            const column = action.payload;
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
            const task = action.payload;
            state.board.tasks[task.id] = task;
            if (state.board.columns[task.type_id].taskIds === null) {
                state.board.columns[task.type_id].taskIds = [task.id];
            } else {
                state.board.columns[task.type_id].taskIds.push(task.id);
            }
        },

        updateTasks(state, action) {
            const task = action.payload
            const columnId = task.column
            delete task.column
            state.board.tasks[task.id] = task;
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
            state.board.tasks = omit(state.board.tasks, deletedColumn.taskIds && [ ...deletedColumn.taskIds]);
            state.board.ordered = state.board.ordered.filter((id) => id !== columnId);
        },
    },
});

export default slice.reducer;
export const {
    setOrdered,
    setColumns,
    changeProject,
    deleteTask,
    updateTasks,
    setProjectMembers,
    addTask,
    createColumnSuccess,
    updateColumnSuccess,
    deleteColumnSuccess,
    setProjects,
    getBoardStart,
    getBoardFailure,
    getBoardSuccess,
} = slice.actions;
