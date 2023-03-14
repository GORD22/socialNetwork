export const required = value => {
    if (value) return undefined
    else return "Field is empty"
}

export const emailValidator = value => {
    if (!value) return 'Required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        return  'Invalid email address';
}