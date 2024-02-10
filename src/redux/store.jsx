import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
} from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import publishReducer from "./slices/Publish";
import postsReducer from "./slices/Posts";
import accountsReducer from "./slices/Account";

export const rootPersistConfig = {
	key: "root",
	storage,
	keyPrefix: "redux-",
	whitelist: ["publish", "accounts"],
};

// export const publishPersistConfig = {
// 	key: "publish",
// 	storage,
// 	keyPrefix: "redux-",
// 	whitelist: [],
// };

const rootReducer = combineReducers({
	publish: publishReducer,
	posts: postsReducer,
	accounts: accountsReducer,
});

const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer), // Use the combined reducer
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

const persistor = persistStore(store);

const useSelector = useAppSelector;
const useDispatch = useAppDispatch; // No need for the arrow function

export { store, useSelector, persistor, useDispatch };
