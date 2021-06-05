import Router from "next/router";
import RegisterForm from "../components/RegisterForm";
import withoutAuth from "../helpers/withoutAuth";
import {registerAsync} from "../store/auth/action";
import {useDispatch} from "react-redux";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const handleRegister = async (userData) => {
        try {
            await dispatch(registerAsync(userData))
            await Router.push('/');
        } catch (e) {
            await Router.push(`/login`);
        }
    };

    return <RegisterForm onSubmit={(userData) => handleRegister(userData)}/>;
};

export const getServerSideProps = withoutAuth()