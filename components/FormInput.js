import {Field} from "formik";

export default function FormInput(props) {
    let errorClass = '';
    if (props.hasErrors) {
        errorClass = 'is-invalid';
    }

    return(
        <Field className={`form-control ${errorClass}`}
               name={props.name}
               type={props.type || 'text'}
               as={props.as || 'input'}
               style={props.style || null}
        />
    );
}