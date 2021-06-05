import Link from "next/link";
import Button from "./Button";
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {logoutAsync} from "../store/auth/action";
import Dropdown from "./Dropdown";

export default function Navbar() {
    const userProfile = useSelector((state) => state.profile.userProfile);
    const dispatch = useDispatch();
    if (!userProfile?.username) {
        return <></>
    }
    const handleLogout = async () => {
        await dispatch(logoutAsync());
        await Router.push('/login');
    }

    return (
        <div className="d-flex justify-content-between shadow-sm mb-5 p-3">
            <Link href={'/[username]'} as={`/${userProfile.username}`}>
                <h1 className="navbar_element pointer">Home page</h1>
            </Link>

            <Link href={'/posts/add'}>
                <h1 className="navbar_element pointer">Add post</h1>
            </Link>

            <Link href={'/users/'}>
                <h1 className="navbar_element pointer">All users</h1>
            </Link>
            <Dropdown text={userProfile.username}>
                <Button onClick={handleLogout}
                        className='dropdown-item hover-danger'
                        text={'Logout'}/>
                <Link href={'/settings'}>
                    <a className='dropdown-item'>Settings</a>
                </Link>
            </Dropdown>
        </div>
    );
};