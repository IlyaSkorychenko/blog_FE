import {authActionTypes} from "./action";

const initialPostState = {
    userProfile: {},
}

export default function reducer(state = initialPostState, action) {
    switch (action.type) {
        case authActionTypes.SET_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }

        default:
            return state
    }
};