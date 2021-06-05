import Button from "./Button";
import Router from "next/router";
import * as Yup from "yup";
import {ErrorMessage, Form, Formik} from "formik";
import FormInput from "./FormInput";
import {useSelector} from "react-redux";

export default function PostForm (props) {
    const post = useSelector((state) => state.post.post);
    const postSchema = Yup.object().shape({
        title: Yup.string()
            .max(255, 'Too Long!')
            .required('Title is required'),
        content: Yup.string()
            .max(65535, 'Too Long!')
            .required('Content is required'),
    });

    return (
        <div className="p-5 justify-content-center w-50 mx-auto">
            <h1>{props.formTitle}</h1>
            <Formik
                initialValues={{
                    title: post.title || '',
                    content: post.content || '',
                }}
                validationSchema={postSchema}
                onSubmit={props.onSubmit}
            >
                {({errors, touched}) => {

                    return (
                        <Form>
                            <div className="mb-3" key="title">
                                <label className="form-label" htmlFor="title">Title</label>
                                <FormInput aria-describedby="titleFeedback" name="title"
                                           hasErrors={errors.title && touched.title}/>
                                <ErrorMessage component="div" id="titleFeedback" name="title"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="mb-3" key="content">
                                <label className="form-label" htmlFor="content">Content</label>
                                <FormInput aria-describedby="contentFeedback" name="content" as="textarea"
                                            hasErrors={errors.content && touched.content}
                                            style={{height: 350}}/>
                                <ErrorMessage component="div" id="contentFeedback" name="content"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Button onClick={() => Router.back()}
                                        text={'Cancel'} className="btn btn-danger"/>
                                <button type="submit" className="btn btn-primary">{props.submitButtonText}</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}