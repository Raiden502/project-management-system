import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	type: "notes",
	owner: "avi",
	data: [],
};

const persistedState = sessionStorage.getItem("reduxState")
	? JSON.parse(sessionStorage.getItem("reduxState"))
	: null;

const todosSlice = createSlice({
	name: "todos",
	initialState: persistedState ? persistedState.todo : initialState,
	reducers: {
		defaultApiLoad(state, action) {
			(state.type = "notes"),
				(state.owner = action.payload.owner),
				(state.data = action.payload.data);
		},
		todoAdded(state, action) {
			state.data.push({
				id: action.payload.id,
				title: action.payload.title,
				content: action.payload.content,
				tags: action.payload.tags,
				createdDate: new Date(),
				modifiedDate: new Date(),
			});
		},
		todoFinder(state, action) {
			const todo = state.data.find(
				(todo) => todo.id === action.payload.id,
			);
			return todo;
		},
		todoModified(state, action) {
			const todo = state.data.find(
				(todo) => todo.id === action.payload.id,
			);
			todo.title = action.payload?.title;
			todo.content = action.payload?.content;
			todo.tags = action.payload?.tags;
			todo.modifiedDate = new Date();
		},
	},
});

export const { todoAdded, todoFinder, todoModified, defaultApiLoad } =
	todosSlice.actions;
export default todosSlice.reducer;
