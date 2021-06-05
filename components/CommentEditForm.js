import * as Yup from "yup";
import {ErrorMessage, Form, Formik} from "formik";
import FormInput from "./FormInput";
import Button from "./Button";

export default function CommentEditForm(props) {
    const commentSchema = Yup.object().shape({
        content: Yup.string()
            .max(65535, 'Too Long!')
            .required('Content is required'),
    });
    return (
            <Formik
                initialValues={{
                    content: props.content,
                }}
                validationSchema={commentSchema}
                onSubmit={props.onEdit}
            >
                {({errors, touched}) => {

                    return (
                        <Form>
                            <div className="mb-3" key="title">
                                <FormInput className="w-50" aria-describedby="contentFeedback" name="content"
                                           as="textarea"
                                           hasErrors={errors.content && touched.content}/>
                                <ErrorMessage component="div" id="contentFeedback" name="content"
                                              className="invalid-feedback"/>
                            </div>

                            <div className="d-flex">
                                <Button onClick={props.onCancel}
                                        text={'Cancel'} className="btn btn-danger mx-2"/>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
    );
}