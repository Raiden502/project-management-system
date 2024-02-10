import { createSlice } from "@reduxjs/toolkit";

/*
notesId: "",
title:"",
description:"",
tags:[],
isPublished: false,
publicationDate: null,
*/

const initialState = {
	publisher: "",
	publisherId: "",
	notes: [],
	currentNote: {
		notesId: "",
		title: "",
		description: "",
		tags: [],
	},
	info: {
		total: 0,
		published: 0,
		unpublished: 0,
	},
};

const PublishSlice = createSlice({
	name: "publish",
	initialState: initialState,
	reducers: {
		setPublisher(state, action) {
			state.publisher = action.payload.publisher;
			state.publisherId = action.payload.publisherId;
		},
		setNewNotes(state, action) {
			console.log("publish", action.payload)
			if(action.payload.notesId && action.payload.title){
				const data = {
					notesId: action.payload.notesId,
					title: action.payload.title,
					description: action.payload.description,
					tags: action.payload.tags,
					isPublished: false,
					publicationDate: null,
				};
				state.notes = [...state.notes, data];
				state.info.total += 1;
				state.info.unpublished += 1;
			}
		},
		setCurrentNote(state, action) {
			state.currentNote.notesId = action.payload.notesId;
			state.currentNote.title = action.payload.title;
			state.currentNote.description = action.payload.description;
			state.currentNote.tags = action.payload.tags;
		},
		setIsPublished(state, action) {
			const data = state.notes.map((item) => {
				if (item?.notesId === action.payload.notesId) {
					state.info.published += 1;
					state.info.unpublished -= 1;
					return { ...item, isPublished: true, publicationDate: "txt" };
				}
				return item;
			});
			state.notes = data;
		},
		removeNotes(state, action) {
			const data = state.notes.filter((item) => {
				if (item?.notesId === action.payload.notesId) {
					if (item.isPublished) {
						state.info.published -= 1;
					} else {
						state.info.unpublished -= 1;
					}
					state.info.total -= 1;
					return item;
				}
			});
			state.notes = data;
		},
		editNotes(state, action) {
			const data = state.notes.map((note) => {
				if (note?.notesId === action.payload.notesId) {
					return {
						...note,
						title: action.payload.title,
						description: action.payload.description,
						tags: action.payload.tags,
					};
				}
			});
			state.notes = data;
		},
		removePublication(state, action) {
			const data = state.notes.map((note) => {
				if (note?.notesId === action.payload.notesId) {
					state.info.unpublished += 1;
					state.info.published -= 1;
					return {
						...note,
						isPublished: false,
						publicationDate: null,
					};
				}
			});
			state.notes = data;
		},
	},
});

export const {
	setIsPublished,
	setNewNotes,
	setPublisher,
	removeNotes,
	editNotes,
	removePublication,
	setCurrentNote,
} = PublishSlice.actions;

export default PublishSlice.reducer;
