import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import {
    setOrdered,
    changeProject,
    setColumns,
    deleteTask,
    updateTasks,
    addTask,
    createColumnSuccess,
    updateColumnSuccess,
    deleteColumnSuccess,
    setProjects,
    getBoardStart,
    getBoardFailure,
    getBoardSuccess,
} from 'src/redux/slices/Kanban';
import axiosInstance from 'src/utils/axios';
import uuidv4 from 'src/utils/uuidv4';
import { AuthContext } from 'src/auth/JwtContext';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function useKanban() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useContext(AuthContext);
    const department = useSelector((state) => state.department);
    const { board, boardStatus, currentProject, projects } = useSelector((state) => state.kanban);

    const { tasks, columns, ordered } = board;

    const fetchProjects = () => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/proj/proj_list', {
                    dept_id: department.department_id,
                });
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(setProjects(data));
                }
            } catch (error) {
                console.log(error);
            }
        };
    };

    const getBoard = (project_id, department_id) => {
        return async (dispatch) => {
            dispatch(getBoardStart());
            try {
                const response = await axiosInstance.post('/tasks/board_details', {
                    project_id,
                    department_id,
                });
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(getBoardSuccess(data));
                    enqueueSnackbar('fetched successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to fetch', { variant: 'warning' });
                }
            } catch (error) {
                dispatch(getBoardFailure(error));
                enqueueSnackbar('Unable to fetch', { variant: 'error' });
            }
        };
    };

    const createColumn = (newData) => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/tasks/create_column', newData);
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(createColumnSuccess(data));
                    enqueueSnackbar('column created successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to save', { variant: 'warning' });
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to save', { variant: 'error' });
            }
        };
    };

    const reorderColumn = (newData) => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/tasks/reorder_column', newData);
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(setOrdered(newData.columns));
                    enqueueSnackbar('column updated successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to update', { variant: 'warning' });
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to update', { variant: 'error' });
            }
        };
    };

    const updateColumn = (columnData) => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/tasks/update_col_name', {
                    type_id: columnData.newData.id,
                    name: columnData.newData.name,
                    proj_id: columnData.proj_id,
                    dept_id: columnData.dept_id,
                });
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(
                        updateColumnSuccess({
                            columnId: columnData.columnId,
                            newData: columnData.newData,
                        })
                    );
                    enqueueSnackbar('column updated successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to update', { variant: 'warning' });
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to update', { variant: 'error' });
            }
        };
    };

    const deleteColumn = (columnId, currentProject) => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/tasks/delete_column', {
                    type_id: columnId,
                    proj_id: currentProject,
                });
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(deleteColumnSuccess(columnId));
                    enqueueSnackbar('column deleted successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to delete', { variant: 'warning' });
                }
            } catch (error) {
                console.error(error);
            }
        };
    };

    const createTaskApi = (newData) => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/tasks/create_tasks', newData);
                const { errorcode, data, message } = response.data;
                if (errorcode === 0) {
                    dispatch(addTask(data));
                    enqueueSnackbar('task saved successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to save', { variant: 'warning' });
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar('failed to save', { variant: 'error' });
            }
        };
    };

    const updateTaskApi = async (columnId, newData) => {
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
                dispatch(updateTasks(newData));
            } catch (error) {
                console.error(error);
            }
        };
    };

    const deleteTaskApi = (data) => {
        return async (dispatch) => {
            try {
                const response = await axiosInstance.post('/tasks/delete_task', data);
                const { errorcode, message } = response.data;
                if (errorcode === 0) {
                    dispatch(deleteTask(data));
                    enqueueSnackbar('task deleted successful', { variant: 'success' });
                } else {
                    enqueueSnackbar('Unable to delete', { variant: 'warning' });
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar('failed to delete', { variant: 'error' });
            }
        };
    };

    const updateOrdered = useCallback(
        (newOrder) => {
            dispatch(
                reorderColumn({
                    columns: newOrder,
                    proj_id: currentProject,
                    dept_id: department.department_id,
                })
            );
        },
        [dispatch, currentProject, department.department_id]
    );

    const updateColumns = useCallback(
        (newColumns) => {
            dispatch(setColumns(newColumns));
        },
        [dispatch]
    );

    const onAddTask = useCallback(
        ({ task, type_id }) => {
            dispatch(
                createTaskApi({
                    ...task,
                    type_id,
                    user_id: user.user_id,
                    proj_id: currentProject,
                    dept_id: department.department_id,
                })
            );
        },
        [dispatch, currentProject, department.department_id, user.user_id]
    );

    const onDeleteTask = useCallback(
        ({ taskId, columnId }) => {
            dispatch(
                deleteTaskApi({
                    taskId,
                    columnId,
                    proj_id: currentProject,
                    dept_id: department.department_id,
                })
            );
        },
        [dispatch, currentProject, department.department_id]
    );

    const onUpdateTask = useCallback(
        ({ task, columnId }) => {
            dispatch(updateTaskApi({ task, columnId }));
        },
        [dispatch]
    );

    const onCreateColumn = useCallback(
        ({ name }) => {
            dispatch(
                createColumn({
                    name,
                    proj_id: currentProject,
                    dept_id: department.department_id,
                    user_id: user.user_id,
                })
            );
        },
        [dispatch, currentProject, department.department_id, user.user_id]
    );

    const onUpdateColumn = useCallback(
        (columnId, newData) => {
            dispatch(
                updateColumn({
                    columnId,
                    newData,
                    proj_id: currentProject,
                    dept_id: department.department_id,
                })
            );
        },
        [dispatch, currentProject, department.department_id, user.user_id]
    );

    const onDeleteColumn = useCallback(
        (columnId) => {
            dispatch(deleteColumn(columnId, currentProject));
        },
        [dispatch, currentProject]
    );

    const onChangeProject = useCallback(
        (event) => {
            dispatch(changeProject(event.target.value));
            dispatch(getBoard(event.target.value, department.department_id));
        },
        [dispatch, department.department_id]
    );

    const onBoardChange = useCallback(
        (project_id) => {
            if (project_id) dispatch(getBoard(currentProject, department.department_id));
        },
        [dispatch, currentProject, department.department_id]
    );

    return {
        tasks,
        columns,
        ordered,
        updateColumns,
        updateOrdered,
        onAddTask,
        onDeleteTask,
        onCreateColumn,
        onUpdateColumn,
        onDeleteColumn,
        onChangeProject,
        onBoardChange,
        fetchProjects,
        projects,
        currentProject,
        boardStatus,
    };
}
