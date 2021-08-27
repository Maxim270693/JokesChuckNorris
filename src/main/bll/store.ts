import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {chuckReducer} from "./reducer";
import {loadState, saveState} from "../../utils/localStorage-utils";


export const rootReducer = combineReducers({
    chuck: chuckReducer
})


export const store = createStore(rootReducer,loadState(),applyMiddleware(thunk))

store.subscribe(() => {
    saveState({
        chuck: store.getState().chuck
    })
})

export type RootStateType = ReturnType<typeof rootReducer>