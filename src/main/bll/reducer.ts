import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "./store";
import {API} from "../dal/API";
import {v1} from "uuid";


const GET_JOKE = 'GET_JOKE'
const GET_JOKES = 'GET_JOKES'
const FAVORITE_JOKE = 'FAVORITE_JOKE'
const REMOVE_JOKE = 'REMOVE_JOKE'
const REMOVE_ALL_JOKES = 'REMOVE_ALL_JOKES'


export type JockType = {
    id: string
    joke: null | string
}

const initialState = {
    joke: null as null | string,
    favoriteJoke: [] as Array<any>
}
type InitialStateType = typeof initialState

export const chuckReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case GET_JOKE:
        case GET_JOKES:
            return {...state, joke: action.joke}
        case FAVORITE_JOKE:
            for(let i = 0; i < state.favoriteJoke.length; i++) {
                if(state.favoriteJoke.length > 9) {
                    return {...state, favoriteJoke: state.favoriteJoke.slice(1)}
                }
            }
            if (action.joke) {
                return {...state, favoriteJoke: [...state.favoriteJoke, {id: v1(), joke: action.joke}]}
            } else {
                return {...state}
            }
        case REMOVE_JOKE:
            return {...state, favoriteJoke: state.favoriteJoke.filter(joke => joke.id !== action.id)}
        case REMOVE_ALL_JOKES:
            return {...state, favoriteJoke: []}
        default:
            return state
    }
}


// AC
const getJokesAC = (joke: string) => ({type: GET_JOKES, joke} as const)
const getJokeAC = (joke: string) => ({type: GET_JOKE, joke} as const)
export const favoriteJokeAC = (joke: string | null) => ({type: FAVORITE_JOKE, joke} as const)
export const removeJokeAC = (id: string) => ({type: REMOVE_JOKE, id} as const)
export const removeAllJokesAC = () => ({type: REMOVE_ALL_JOKES} as const)


// TC
export const getJokesTC = () => (dispatch: ThunkDispatch<RootStateType, unknown, ActionType>) => {
    API.getJoke()
        .then(res => {
            dispatch(getJokesAC(res.data.value))
        })
}

export const getJokeTC = () => (dispatch: ThunkDispatch<RootStateType, unknown, ActionType>) => {
    API.getJoke()
        .then(res => {
            dispatch(getJokeAC(res.data.value))
        })
}

type GetJokesActionType = ReturnType<typeof getJokesAC>
type GetJokeActionType = ReturnType<typeof getJokeAC>
type FavoriteJokeActionType = ReturnType<typeof favoriteJokeAC>
type RemoveJokeActionType = ReturnType<typeof removeJokeAC>
type RemoveAllJokeActionType = ReturnType<typeof removeAllJokesAC>


export type ActionType =
    GetJokesActionType
    | GetJokeActionType
    | FavoriteJokeActionType
    | RemoveJokeActionType
    | RemoveAllJokeActionType