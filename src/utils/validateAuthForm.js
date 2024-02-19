
export default function validateForm(values) {
    let errors = {}
    if (!values.username.trim()) {
        errors.username = "Username is required"
    }
    if (!values.password.trim()) {
        errors.username = "Password is required"
    }
    if (values.username.length < 4 || values.username.length > 10) {
        errors.username = `User name should be > 4 < 8`
    }
    if (values.password.length < 4) {
        errors.password = `Password length should >= 4`
    }
    return errors
}

