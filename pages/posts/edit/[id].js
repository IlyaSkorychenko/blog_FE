import PostForm from "../../../components/PostForm";
import Router from "next/router";
import withAuth from "../../../helpers/withAuth";
import withRedux from "../../../helpers/withRedux";
import {getPostAsync, editPostAsync} from "../../../store/post/action";
import {useDispatch, useSelector} from "react-redux";

export default function EditPostPage () {
    const post = useSelector((state) => state.post.post);
    const dispatch = useDispatch();
    const handleEditPost = async (postData) =>  {
        await dispatch(editPostAsync(postData, post.id));
        await Router.push(`/`);
    }
    return <PostForm formTitle={'Edit post'}
                     submitButtonText={'Edit'}
                     onSubmit={(postData) => handleEditPost(postData)}/>
}

export const getServerSideProps = withRedux(withAuth(async ({ctx, dispatch}) => {
    try {
        await dispatch(getPostAsync(ctx.query.id));
        return {props: {}}
    } catch (e) {
        return {
            notFound: true
        }
    }

}));