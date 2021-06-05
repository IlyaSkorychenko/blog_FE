import Link from "next/link";
import withAuth from "../helpers/withAuth";
import {useSelector} from "react-redux";
import {getAllUsersAsync} from "../store/user/action";
import withRedux from "../helpers/withRedux";

export default function UsersPage() {
    const users = useSelector((state) => state.user.users);

    return(
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column">
                {users.map(user => {
                    return <Link href={'/[username]'} as={`/${user.username}`} key={user.id}>
                        <button className="btn btn-secondary mb-2">
                            {user.full_name}
                        </button>
                    </Link>
                })}
            </div>
        </div>
    );
}

export const getServerSideProps = withRedux(withAuth(async ({dispatch}) => {
    await dispatch(getAllUsersAsync());
    return {
        props: {}
    }
}));