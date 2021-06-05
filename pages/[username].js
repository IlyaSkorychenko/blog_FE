import Post from "../components/Post";
import withAuth from "../helpers/withAuth";
import {getPostsAsync, removePostAsync} from "../store/post/action";
import {useDispatch, useSelector} from "react-redux";
import withRedux from "../helpers/withRedux";

export default function UserPostsPage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const userProfile = useSelector((state) => state.profile.userProfile);

    const handleDeletePost = async (postId) => {
        await dispatch(removePostAsync(postId));
    };

    return (
        <div className="d-flex flex-column">
            {posts.map((post) => (
                <div className="mb-5" key={post.id}>
                    <Post post={post}
                          onDelete={() => handleDeletePost(post.id)}
                          maxLength={150}
                          canEdit={post.author.id === userProfile.id}/>
                </div>
            ))}
        </div>
    )
};

export const getServerSideProps = withRedux(withAuth(async ({ctx, dispatch}) => {
    try {
        await dispatch(getPostsAsync(ctx.query.username))
        return {props: {}};
    } catch (e) {
        return {
            notFound: true
        }
    }
}));