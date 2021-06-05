import {gePostsList, getPost,deletePost, createPost, updatePost} from "../../api/post";

export const postActionTypes = {
    SET_POSTS: 'SET_POSTS',
    SET_POST: 'SET_POST',
    ADD_POST: 'ADD_POST',
    DELETE_POST: 'DELETE_POST',
    EDIT_POST: 'EDIT_POST',
}

export const setPosts = (posts) => (dispatch) =>
    dispatch({
        type: postActionTypes.SET_POSTS,
        payload: posts
    });

export const setPost = (post) => (dispatch) =>
    dispatch({
        type: postActionTypes.SET_POST,
        payload: post
    });


export const getPostsAsync = (username) => async (dispatch) => {
    const posts = await gePostsList(username);
    return dispatch(setPosts(posts));
}

export const getPostAsync = (postId) => async (dispatch) => {
    const post = await getPost(postId);
    return dispatch(setPost(post));
}

export const addPostAsync = (postData) => async (dispatch) => {
    return dispatch({
        type: postActionTypes.ADD_POST,
        payload: await createPost(postData)
    })
}

export const editPostAsync = (postData, postId) => async (dispatch) => {
    const post = await updatePost({postData, postId});
    return dispatch(editPost(post));
}

export const editPost = (post) => async (dispatch) => {
    return dispatch({
        type: postActionTypes.ADD_POST,
        payload: post
    })
}

export const removePostAsync = (postId) => async (dispatch) => {
    await deletePost(postId);
    return dispatch(removePost(postId));
}

export const removePost = (postId) => async (dispatch) => {
    return dispatch({
        type: postActionTypes.DELETE_POST,
        payload: postId
    })
}
