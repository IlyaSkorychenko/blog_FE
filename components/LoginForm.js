import * as Yup from 'yup';
import Button from "./Button";
import Router from "next/router";
import {ErrorMessage, Form, Formik} from "formik";
import FormInput from "./FormInput";

export default function LoginForm(props) {
    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    return (
        <div className="p-5 justify-content-center w-25 mx-auto">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={props.onSubmit}
            >
                {({errors, touched}) => {

                    return (
                        <Form>
                            <div className="mb-3" key="username">
                                <label className="form-label" htmlFor="username">Username</label>
                                <FormInput aria-describedby="usernameFeedback" name="username"
                                           hasErrors={errors.username && touched.username}/>
                                <ErrorMessage component="div" id="usernameFeedback" name="username"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="mb-3" key="password">
                                <label className="form-label" htmlFor="password">Password</label>
                                <FormInput aria-describedby="passwordFeedback" name="password" type="password"
                                           hasErrors={errors.password && touched.password}/>
                                <ErrorMessage component="div" id="passwordFeedback" name="password"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Button onClick={() => Router.push('/register')}
                                        text={'Register'} className="btn btn-secondary"/>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}