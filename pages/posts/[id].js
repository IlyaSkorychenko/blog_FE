import Post from "../../components/Post";
import Button from "../../components/Button";
import Router from "next/router";
import withAuth from "../../helpers/withAuth";
import withRedux from "../../helpers/withRedux";
import {getPostAsync, removePostAsync} from "../../store/post/action";
import {addCommentAsync, removeCommentAsync} from "../../store/comment/action";
import {useDispatch, useSelector} from "react-redux";
import {getPostCommentsAsync} from "../../store/comment/action";
import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";

export default function PostPage() {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post.post);
    const isPostOwner = useSelector((state) => state.user.isPostOwner);
    const comments = useSelector((state) => state.comment.comments);
    const userProfile = useSelector((state) => state.profile.userProfile);

    const handleDeletePost = async (postId) => {
        await dispatch(removePostAsync(postId));
        await Router.back();
    }

    const handleDeleteComment = async (commentId) => {
        await dispatch(removeCommentAsync(commentId));
    }

    const handleAddComment = async (commentData) => {
        await dispatch(addCommentAsync(post.id, commentData));
    }

    return (
        <>
            <div className="mb-1">
                <Post post={post} onDelete={() => handleDeletePost(post.id)} canEdit={isPostOwner}>
                    <Button onClick={Router.back} className="btn btn-secondary align-self-end" text={'Back'}/>
                </Post>
            </div>
            <div className="px-5 mt-5">
                {!comments.length ?
                    <p className="text-secondary">No comments</p>
                    : <h1>Comments</h1>}
            </div>

            {comments.map(comment =>(
                <div key={comment.id}>
                    <Comment comment={comment}
                             showControls={userProfile.username === comment.author.username}
                             onDelete={handleDeleteComment}/>
                </div>
            ))}

            <CommentForm onSubmit={(commentData) => handleAddComment(commentData)}/>

        </>
    )

}

export const getServerSideProps = withRedux(withAuth(async ({ctx, dispatch}) => {
    try {
        const postId = ctx.query.id;
        await Promise.all([
            dispatch(getPostAsync(postId)),
            dispatch(getPostCommentsAsync(postId))
        ]);
        return {props: {}}
    } catch (e) {
        return {
            notFound: true
        }
    }
}));