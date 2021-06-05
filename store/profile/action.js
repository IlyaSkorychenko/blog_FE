import {getUserProfile, updateUserProfile} from "../../api/user";

export const authActionTypes = {
    SET_PROFILE: 'SET_PROFILE',
}

export const setProfile = (userProfile) => async (dispatch) => {
    return dispatch({
        type: authActionTypes.SET_PROFILE,
        payload: userProfile,
    })
}

export const getProfileAsync = () => async (dispatch) => {
    return dispatch(setProfile(await getUserProfile()))
}

export const updateProfileAsync = (profileData) => async (dispatch) => {
    return dispatch(setProfile(await updateUserProfile(profileData)))
}