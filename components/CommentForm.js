import * as Yup from "yup";
import {ErrorMessage, Form, Formik} from "formik";
import FormInput from "./FormInput";

export default function CommentForm(props) {
    const commentSchema = Yup.object().shape({
        content: Yup.string()
            .max(65535, 'Too Long!')
            .required('Content is required'),
    });
    return (
        <div className="p-5 bg-light mb-3 shadow-sm">
            <h1>Add comment</h1>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    content: '',
                }}
                validationSchema={commentSchema}
                onSubmit={async (values, actions) => {
                    await props.onSubmit(values);
                    actions.resetForm({
                        values: {
                            content: '',
                        }
                    })
                }}
            >
                {({errors, touched}) => {

                    return (
                        <Form>
                            <div className="mb-3" key="title">
                                <label className="form-label" htmlFor="content">Content</label>
                                <FormInput className="w-50" aria-describedby="contentFeedback" name="content"
                                           as="textarea"
                                           hasErrors={errors.content && touched.content}/>
                                <ErrorMessage component="div" id="contentFeedback" name="content"
                                              className="invalid-feedback"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Add</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}