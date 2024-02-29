import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
} from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import kanbanReducer from './slices/Kanban'
import accountsReducer from "./slices/Account";
import departmentReducer from "./slices/Departments"


export const rootPersistConfig = {
	key: "root",
	storage,
	keyPrefix: "redux-",
	whitelist: ["accounts"],
};

const rootReducer = combineReducers({
	accounts: accountsReducer,
	kanban: kanbanReducer,
	department:departmentReducer,
});

const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

const persistor = persistStore(store);
const useSelector = useAppSelector;
const useDispatch = useAppDispatch;
export { store, useSelector, persistor, useDispatch };
