import {getUsers} from "../../api/user";

export const userActionTypes = {
    SET_USERS: 'SET_USERS'
}

export const setAllUsers = (users) => async (dispatch) => {
    return dispatch({
        type: userActionTypes.SET_USERS,
        payload: users,
    })
}

export const getAllUsersAsync = () => async (dispatch) => {
    return dispatch(setAllUsers(await getUsers()))
}