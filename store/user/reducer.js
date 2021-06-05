import {userActionTypes} from "./action";

const initialUserState = {
    users: {}
}

export default function reducer(state = initialUserState, action) {
    switch (action.type) {
        case userActionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload
            }

        default:
            return state
    }
};