import customToast from "../lib/toast";

export default async function outputServerError(error) {
    let errors
    try {
        if (error.response.status === 401){
            errors = [['Incorrect username or password']]
        } else {
            errors = Object.values(error.response.data.errors);
        }
    } catch (e) {
        errors = [['Server error']]
    }
    errors.map(message => {
        customToast.error(message[0]);
        }
    )
}