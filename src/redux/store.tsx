import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducers from "./mainreducers";
// import logger from 'redux-logger';

const resetStoreActionType = "main/resetStore";

const combinedReducer = combineReducers(reducers);
export const rootReducer = (state: any, action: any) => {
	// when a logout action is dispatched it will reset redux state
	if (action.type === resetStoreActionType) {
		// eslint-disable-next-line
		state = undefined;
	}
	return combinedReducer(state, action);
};

const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const resetStore = () => {
	store.dispatch({ type: resetStoreActionType });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
