import {apiClient} from "../lib/axios";

export async function getComments (postId)  {
    const {data: comments} = await apiClient.instance.get(`posts/${postId}/comments/`);
    return comments;
}

export async function createComment (postId, commentData)  {
    const {data: comment} = await apiClient.instance.post(`posts/${postId}/comments/`, commentData);
    return comment;
}

export async function deleteComment (commentId)  {
    const {data: response} = await apiClient.instance.delete(`comments/${commentId}/`);
    return response;
}

export async function updateComment (commentId, commentData)  {
    const {data: comment} = await apiClient.instance.put(`comments/${commentId}/`, commentData);
    return comment;
}