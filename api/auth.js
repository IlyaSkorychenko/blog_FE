import {axiosNextApiInstance} from "../lib/axios";

export async function login(data) {
    const {data: {token}} = await axiosNextApiInstance.post('login', data);
    return token;
}

export async function register(data) {
    const {data: {token}} = await axiosNextApiInstance.post('register', data);
    return token;
}

export async function logout() {
    await axiosNextApiInstance.get('logout');
}