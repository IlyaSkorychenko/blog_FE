import {apiClient} from "../lib/axios";

export async function getPost (id)  {
    const {data: post} = await apiClient.instance.get(`posts/${id}`);
    return post;
}

export async function deletePost (id) {
    const {data: response} = await apiClient.instance.delete(`posts/${id}`)
    return response;
}

export async function createPost (postData) {
    const {data: createdPost} = await apiClient.instance.post('posts/', postData);
    return createdPost;
}

export async function updatePost ({postData, postId}) {
    const {data: updatedPost} = await apiClient.instance.put(`posts/${postId}`, postData);
    return updatedPost;
}

export async function gePostsList(username) {
    const {data: posts} =  await apiClient.instance.get(`users/${username}/posts/`)
    return posts;
}