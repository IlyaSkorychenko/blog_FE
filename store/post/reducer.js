import {postActionTypes} from "./action";

const initialPostState = {
    posts: [],
    post: {}
}

export default function reducer(state = initialPostState, action) {
    switch (action.type) {
        case postActionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }

        case postActionTypes.SET_POST:
            return {
                ...state,
                post: action.payload
            }

        case postActionTypes.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

        case postActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            }

        case postActionTypes.EDIT_POST:
            return {
                ...state,
                posts: [state.posts.filter(post => post.id !== action.payload.id), action.payload]
            }

        default:
            return state
    }
};