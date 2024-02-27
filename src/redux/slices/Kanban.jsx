import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    board: {
        tasks: {
            '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': {
                id: '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                due: [null, null],
                status: 'To Do',
                labels: [],
                comments: [],
                assignee: [],
                priority: 'low',
                attachments: [],
                reporter: {
                    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
                    name: 'Angelique Morse',
                    avatarUrl:
                        'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_17.jpg',
                },
                name: 'Complete Project Proposal',
                description:
                    'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
            },
            '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': {
                id: '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                due: [1709188020017, 1709274420017],
                status: 'To Do',
                labels: ['Technology'],
                comments: [
                    {
                        id: '5465a1a7-546c-415e-bd57-54e6abddefda',
                        name: 'Jayvion Simon',
                        createdAt: '2024-02-27T06:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                        messageType: 'text',
                        message:
                            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
                    },
                ],
                assignee: [
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                        name: 'Jayvion Simon',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                    },
                ],
                priority: 'hight',
                attachments: [
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_12.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_13.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_14.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_15.jpg',
                ],
                reporter: {
                    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
                    name: 'Angelique Morse',
                    avatarUrl:
                        'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_17.jpg',
                },
                name: 'Conduct Market Research',
                description:
                    'Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.',
            },
            '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': {
                id: '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                due: [1709274420017, 1709360820017],
                status: 'To Do',
                labels: ['Technology', 'Marketing'],
                comments: [
                    {
                        id: '5465a1a7-546c-415e-bd57-54e6abddefda',
                        name: 'Jayvion Simon',
                        createdAt: '2024-02-27T06:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                        messageType: 'text',
                        message:
                            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
                    },
                    {
                        id: '340dee96-ef73-4113-8e52-d973438c3162',
                        name: 'Lucian Obrien',
                        createdAt: '2024-02-26T05:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_7.jpg',
                    },
                ],
                assignee: [
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                        name: 'Jayvion Simon',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                        name: 'Lucian Obrien',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                    },
                ],
                priority: 'medium',
                attachments: [],
                reporter: {
                    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
                    name: 'Angelique Morse',
                    avatarUrl:
                        'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_17.jpg',
                },
                name: 'Design User Interface Mockups',
                description:
                    'Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.',
            },
            '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4': {
                id: '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
                due: [1709360820017, 1709447220017],
                status: 'In Progress',
                labels: ['Technology', 'Marketing', 'Design'],
                comments: [
                    {
                        id: '5465a1a7-546c-415e-bd57-54e6abddefda',
                        name: 'Jayvion Simon',
                        createdAt: '2024-02-27T06:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                        messageType: 'text',
                        message:
                            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
                    },
                    {
                        id: '340dee96-ef73-4113-8e52-d973438c3162',
                        name: 'Lucian Obrien',
                        createdAt: '2024-02-26T05:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_7.jpg',
                    },
                    {
                        id: '757a9680-270b-4885-93d1-d0047d0fc519',
                        name: 'Deja Brady',
                        createdAt: '2024-02-25T04:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_3.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_8.jpg',
                    },
                ],
                assignee: [
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                        name: 'Jayvion Simon',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                        name: 'Lucian Obrien',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                        name: 'Deja Brady',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_3.jpg',
                    },
                ],
                priority: 'hight',
                attachments: [],
                reporter: {
                    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
                    name: 'Angelique Morse',
                    avatarUrl:
                        'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_17.jpg',
                },
                name: 'Develop Backend API',
                description:
                    'Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.',
            },
            '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5': {
                id: '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
                due: [1709447220017, 1709533620017],
                status: 'In Progress',
                labels: ['Technology', 'Marketing', 'Design', 'Photography'],
                comments: [
                    {
                        id: '5465a1a7-546c-415e-bd57-54e6abddefda',
                        name: 'Jayvion Simon',
                        createdAt: '2024-02-27T06:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                        messageType: 'text',
                        message:
                            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
                    },
                    {
                        id: '340dee96-ef73-4113-8e52-d973438c3162',
                        name: 'Lucian Obrien',
                        createdAt: '2024-02-26T05:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_7.jpg',
                    },
                    {
                        id: '757a9680-270b-4885-93d1-d0047d0fc519',
                        name: 'Deja Brady',
                        createdAt: '2024-02-25T04:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_3.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_8.jpg',
                    },
                    {
                        id: '8678218c-f860-4754-b606-c02c1a0c426c',
                        name: 'Harrison Stein',
                        createdAt: '2024-02-24T03:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_4.jpg',
                        messageType: 'text',
                        message:
                            'The aroma of freshly brewed coffee filled the air, awakening my senses.',
                    },
                ],
                assignee: [
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                        name: 'Jayvion Simon',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                        name: 'Lucian Obrien',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                        name: 'Deja Brady',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_3.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
                        name: 'Harrison Stein',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_4.jpg',
                    },
                ],
                priority: 'medium',
                attachments: [],
                reporter: {
                    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
                    name: 'Angelique Morse',
                    avatarUrl:
                        'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_17.jpg',
                },
                name: 'Implement Authentication System',
                description:
                    'Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.',
            },
            '6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6': {
                id: '6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
                due: [1709533620017, 1709620020017],
                status: 'Done',
                labels: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
                comments: [
                    {
                        id: '5465a1a7-546c-415e-bd57-54e6abddefda',
                        name: 'Jayvion Simon',
                        createdAt: '2024-02-27T06:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                        messageType: 'text',
                        message:
                            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
                    },
                    {
                        id: '340dee96-ef73-4113-8e52-d973438c3162',
                        name: 'Lucian Obrien',
                        createdAt: '2024-02-26T05:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_7.jpg',
                    },
                    {
                        id: '757a9680-270b-4885-93d1-d0047d0fc519',
                        name: 'Deja Brady',
                        createdAt: '2024-02-25T04:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_3.jpg',
                        messageType: 'image',
                        message:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_8.jpg',
                    },
                    {
                        id: '8678218c-f860-4754-b606-c02c1a0c426c',
                        name: 'Harrison Stein',
                        createdAt: '2024-02-24T03:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_4.jpg',
                        messageType: 'text',
                        message:
                            'The aroma of freshly brewed coffee filled the air, awakening my senses.',
                    },
                    {
                        id: 'd36f6e34-39f0-4914-947c-38617c8c4564',
                        name: 'Reece Chung',
                        createdAt: '2024-02-23T02:27:00.018Z',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_5.jpg',
                        messageType: 'text',
                        message:
                            'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
                    },
                ],
                assignee: [
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                        name: 'Jayvion Simon',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_1.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                        name: 'Lucian Obrien',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_2.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                        name: 'Deja Brady',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_3.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
                        name: 'Harrison Stein',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_4.jpg',
                    },
                    {
                        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
                        name: 'Reece Chung',
                        avatarUrl:
                            'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_5.jpg',
                    },
                ],
                priority: 'low',
                attachments: [
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_5.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_6.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_7.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_8.jpg',
                    'https://api-dev-minimal-v5.vercel.app/assets/images/cover/cover_9.jpg',
                ],
                reporter: {
                    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
                    name: 'Angelique Morse',
                    avatarUrl:
                        'https://api-dev-minimal-v5.vercel.app/assets/images/avatar/avatar_17.jpg',
                },
                name: 'Write Test Cases',
                description:
                    'Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.',
            },
        },
        columns: {
            '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': {
                id: '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                name: 'To Do',
                taskIds: [
                    '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                    '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                    '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                ],
            },
            '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': {
                id: '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                name: 'In Progress',
                taskIds: [
                    '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
                    '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
                ],
            },
            '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': {
                id: '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                name: 'Ready To Test',
                taskIds: [],
            },
            '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4': {
                id: '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
                name: 'Done',
                taskIds: ['6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6'],
            },
        },
        ordered: [
            '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
            '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
            '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
            '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        ],
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
export const { setOrdered, setColumns, addTask, deleteTask } = slice.actions;

export function getBoard() {
    return async (dispatch) => {
        dispatch(slice.actions.getBoardStart());
        try {
            const response = await axios.get(API_ENDPOINTS.kanban);
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
            const response = await axios.post(API_ENDPOINTS.kanban, data, {
                params: {
                    endpoint: 'create',
                },
            });
            dispatch(slice.actions.createColumnSuccess(response.data.column));
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
            const response = await axios.post(API_ENDPOINTS.kanban, data, {
                params: {
                    endpoint: 'update',
                },
            });
            dispatch(slice.actions.updateColumnSuccess(response.data.column));
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
            const response = await axios.post(API_ENDPOINTS.kanban, data, {
                params: {
                    endpoint: 'delete',
                },
            });
            dispatch(slice.actions.deleteColumnSuccess(response.data.columnId));
        } catch (error) {
            console.error(error);
        }
    };
}
