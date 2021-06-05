import {apiClient} from "../lib/axios";

export async function getUsers() {
    const {data: user} = await apiClient.instance.get('users/');
    return user;
}

export async function getUserProfile() {
    const {data: profile} = await apiClient.instance.get('users/profile/');
    return profile;
}

export async function updateUserProfile(profileData) {
    const formData = new FormData();
    Object.keys(profileData).map((key) => {
        formData.append(key, profileData[key]);
    });
    formData.append('_method', 'PUT');
    const {data: profile} = await apiClient.instance.post('users/profile/',
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
    );
    return profile;
}