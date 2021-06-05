import * as Yup from "yup";
import Button from "./Button";
import Router from "next/router";
import {ErrorMessage, Form, Formik} from "formik";
import FormInput from "./FormInput";

export default function RegisterForm (props) {
    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Username is required'),
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .matches(/^[\w$]*$/, 'Password can consist of characters a-z, A-Z, 0-9, _, $')
            .min(6, 'Too Short!')
            .required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'The password and confirm password fields do not match')
            .required('Password confirmation is required'),
    });

    return (
        <div className="p-5 justify-content-center w-25 mx-auto">
            <h1>Registration</h1>
            <Formik
                initialValues={{
                    username: '',
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }}
                validationSchema={registerSchema}
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

                            <div className="mb-3" key="name">
                                <label className="form-label" htmlFor="name">Name</label>
                                <FormInput aria-describedby="nameFeedback" name="name"
                                           hasErrors={errors.name && touched.name}/>
                                <ErrorMessage component="div" id="nameFeedback" name="name"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="mb-3" key="email">
                                <label className="form-label" htmlFor="email">Email</label>
                                <FormInput aria-describedby="emailFeedback" name="email" type="email"
                                           hasErrors={errors.email && touched.email}/>
                                <ErrorMessage component="div" id="emailFeedback" name="email"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="mb-3" key="password">
                                <label className="form-label" htmlFor="password">Password</label>
                                <FormInput aria-describedby="passwordFeedback" name="password" type="password"
                                           hasErrors={errors.password && touched.password}/>
                                <ErrorMessage component="div" id="passwordFeedback" name="password"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="mb-3" key="password_confirmation">
                                <label className="form-label" htmlFor="password_confirmation">Confirm password</label>
                                <FormInput aria-describedby="password_confirmationFeedback"
                                           name="password_confirmation" type="password"
                                           hasErrors={errors.password_confirmation && touched.password_confirmation}/>
                                <ErrorMessage component="div" id="password_confirmationFeedback"
                                              name="password_confirmation"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Button onClick={() => Router.back()}
                                        text={'Cancel'} className="btn btn-danger"/>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}