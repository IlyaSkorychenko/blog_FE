import {commentActionTypes} from "./action";
const initialCommentState = {
    comments: [],
}

export default function reducer(state = initialCommentState, action) {
    switch (action.type) {
        case commentActionTypes.SET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }

        case commentActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }

        case commentActionTypes.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload)
            }

        case commentActionTypes.EDIT_COMMENT:
            return {
                ...state,
                comments: [...state.comments.filter(comment => comment.id !== action.payload.id), action.payload]
            }

        default:
            return state
    }
}