import {getComments, deleteComment, updateComment, createComment} from "../../api/comment";

export const commentActionTypes = {
    SET_COMMENTS: 'SET_COMMENTS',
    DELETE_COMMENT: 'DELETE_COMMENT',
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
}

export const setComments = (comments) => async (dispatch) => {
    return dispatch({
        type: commentActionTypes.SET_COMMENTS,
        payload: comments,
    })
}

export const getPostCommentsAsync = (postId) => async (dispatch) => {
    const comments = await getComments(postId);
    const newComments = comments.map(comment => ({...comment, edit: false}));
    return dispatch(setComments(newComments));
}

export const removeCommentAsync = (commentId) => async (dispatch) => {
    await deleteComment(commentId);
    return dispatch(removeComment(commentId));
}

export const removeComment = (commentId) => async (dispatch) => {
    return dispatch({
        type: commentActionTypes.DELETE_COMMENT,
        payload: commentId,
    })
}

export const addCommentAsync = (postId, commentData) => async (dispatch) => {
    return dispatch({
        type: commentActionTypes.ADD_COMMENT,
        payload:  await createComment(postId, commentData),
    })
}

export const editCommentAsync = (commentId, commentData) => async (dispatch) => {
    const comment = await updateComment(commentId, commentData);
    return dispatch(editComment(comment));
}

export const editComment= (comment) => async (dispatch, ) => {
    return dispatch({
        type: commentActionTypes.EDIT_COMMENT,
        payload:  comment,
    })
}