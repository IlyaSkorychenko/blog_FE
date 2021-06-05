import * as Yup from "yup";
import {ErrorMessage, Form, Formik} from "formik";
import FormInput from "./FormInput";
import Button from "./Button";

export default function ProfileForm(props) {
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];
    const updateProfileSchema = Yup.object().shape({
        firstname: Yup.string().required('Username is required'),
        lastname: Yup.string().required('lastname is required'),
        avatar: Yup.mixed()
            .test(
                "fileFormat",
                "Unsupported Image Format",
                value => {
                    if (value) {
                        return Boolean(SUPPORTED_FORMATS.includes(value.type));
                    }
                    return true;
                }
            )
    });

    return (
            <div>
                <Formik
                    initialValues={{
                        firstname: props.profile.firstname,
                        lastname: props.profile.lastname,
                        avatar: undefined
                    }}
                    validationSchema={updateProfileSchema}
                    onSubmit={(values) => {
                        if(!values.avatar){
                            delete values.avatar;
                        }
                        props.onSubmit(values);
                    }}
                >
                    {({errors, touched, setFieldValue}) => {
                        return (
                            <Form>
                                <div className="row">
                                    <div className="col-7">
                                        {props.children}
                                        <div className="mb-3" key="avatar">
                                            <label className="form-label mx-1" htmlFor="avatar">Avatar</label>
                                            <input id="avatar" name="avatar" type="file"
                                                   className={`form-control w-50 ${errors.avatar ? 'is-invalid': ''}`}
                                                   aria-describedby="avatarFeedback"
                                                   onChange={(event) => {
                                                       setFieldValue("avatar", event.currentTarget.files[0]);
                                            }}/>
                                            <div id="avatarFeedback" className="invalid-feedback">
                                                {errors.avatar}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="mb-3" key="firstname">
                                            <label className="form-label" htmlFor="firstname">Firstname</label>
                                            <FormInput aria-describedby="firstnameFeedback" name="firstname"
                                                       hasErrors={errors.firstname && touched.firstname}/>
                                            <ErrorMessage component="div" id="firstnameFeedback" name="firstname"
                                                          className="invalid-feedback"/>
                                        </div>

                                        <div className="mb-3" key="lastname">
                                            <label className="form-label" htmlFor="lastname">Lastname</label>
                                            <FormInput aria-describedby="lastnameFeedback" name="lastname"
                                                       hasErrors={errors.lastname && touched.lastname}/>
                                            <ErrorMessage component="div" id="lastnameFeedback" name="lastname"
                                                          className="invalid-feedback"/>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <Button
                                                onClick={props.onCancelEdit}
                                                className="btn btn-danger" text={'Cancel'}/>
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
    );
}