import Router from "next/router";
import LoginForm from "../components/LoginForm";
import withoutAuth from "../helpers/withoutAuth";
import {useDispatch} from "react-redux";
import {loginAsync} from "../store/auth/action";

export default function LoginPage() {
    const dispatch = useDispatch();
    const handleLogin = async (userData) => {
        try {
            await dispatch(loginAsync(userData))
            await Router.push('/');
        } catch (e) {
            await Router.push(`/login`);
        }
    };

    return <LoginForm onSubmit={(userData) => handleLogin(userData)}/>;
};

export const getServerSideProps = withoutAuth()
