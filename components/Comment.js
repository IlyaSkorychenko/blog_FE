import {useDispatch} from "react-redux";
import Link from "next/link";
import Button from "./Button";
import {editCommentAsync} from "../store/comment/action";
import {useState} from "react";
import CommentEditForm from "./CommentEditForm";

export default function Comment(props){
    const dispatch = useDispatch();
    const handleEdit = async (commentData) => {
        await dispatch(editCommentAsync(props.comment.id, commentData));
        setEditing(!editing);
    }
    const handleCancelEdit = () => setEditing(!editing);
    const [editing, setEditing] = useState(false);

    const controls = props.showControls ? (
        <div  className="d-flex">
            <Button
                onClick={() =>props.onDelete(props.comment.id)}
                className="btn btn-danger mx-1" text={'Delete'}/>
            <Button
                onClick={() => setEditing(!editing)}
                className="btn btn-primary" text={'Edit'}/>
        </div>
    ) : null
    const content = editing ?
        <CommentEditForm
            content={props.comment.content}
            onEdit={handleEdit}
            onCancel={handleCancelEdit}/>
        :
        <>
            <p>{props.comment.content}</p>
            {controls}
        </>





    return (
        <div className="p-5 bg-light mb-3 shadow-sm w-50 d-flex flex-column m-auto">
            <Link href={`/${props.comment.author.username}`}>
                <h3 className="pointer">{props.comment.author.full_name}</h3>
            </Link>
            {content}
        </div>
)
}