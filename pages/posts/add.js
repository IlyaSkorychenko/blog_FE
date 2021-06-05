import PostForm from "../../components/PostForm";
import Router from "next/router";
import withAuth from "../../helpers/withAuth";
import withRedux from "../../helpers/withRedux";
import {addPostAsync}  from "../../store/post/action" ;
import {useDispatch} from "react-redux";

export default function AddPostPage () {
    const dispatch = useDispatch()
    const handleCreatePost = async (post) => {
        await dispatch(addPostAsync(post));
        await Router.push('/');
    }

    return <PostForm formTitle={'Add post'}
                     submitButtonText={'Add'}
                     initialValue={{}}
                     onSubmit={(post) => handleCreatePost(post)}/>
}

export const getServerSideProps = withRedux(withAuth());