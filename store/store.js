import {useMemo} from 'react'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import postReducer from "./post/reducer";
import userReducer from "./user/reducer";
import commentReducer from "./comment/reducer";
import profileReducer from "./profile/reducer";

let store

const combineReducer = combineReducers({
    profile: profileReducer,
    post: postReducer,
    user: userReducer,
    comment: commentReducer
})

function initStore(initialState) {
    return createStore(
        combineReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        store = undefined
    }

    if (typeof window === 'undefined') return _store
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState])
}