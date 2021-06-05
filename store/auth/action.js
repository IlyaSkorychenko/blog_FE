import {login, logout, register} from "../../api/auth";
import {apiClient} from "../../lib/axios";
import {getProfileAsync, setProfile} from "../profile/action";

export const logoutAsync = () => async (dispatch) => {
    await logout();
    return dispatch(setProfile({}))
}

export const loginAsync = (loginData) => async (dispatch) => {
    const token = await login(loginData);
    apiClient.setToken(token);
    return await dispatch(getProfileAsync());
}

export const registerAsync = (registerData) => async (dispatch) => {
    const token = await register(registerData);
    apiClient.setToken(token);
    return await dispatch(getProfileAsync());
}