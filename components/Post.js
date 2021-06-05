import Link from "next/link";
import sliceContent from "../helpers/sliceContent";
import Button from "./Button";

export default function Post (props) {
    let deleteButton;
    let editButton;
    if (props.canEdit) {
        deleteButton = <Button onClick={props.onDelete} className="btn btn-danger mx-1" text={'Delete'}/>;
        editButton = (
            <Link href={`/posts/edit/${props.post.id}`}>
                <button className="btn btn-primary">Edit</button>
            </Link>
        );
    }
    return (
        <div className="container p-4 bg-light shadow-lg rounded flex-column d-flex align-content-start">
            <Link href={`/posts/${props.post.id}`}>
                <h1 className="pointer">{props.post.title}</h1>
            </Link>

            <p className="p-1 border-start">
                {sliceContent(props.post.content, props.maxLength)}
            </p>

            <Link href={`/${props.post.author.username}`}>
                <span className="align-self-end mb-3 pointer">User: {props.post.author.full_name}</span>
            </Link>

            <div className="d-flex w-100 justify-content-between">
                <div>
                    {deleteButton}
                    {editButton}
                </div>
                {props.children}
            </div>

        </div>
    );
}