import {Field, Form, Formik, FormikValues} from 'formik'
import {required} from "../../utils/validators/validators";
import style from "./DialogsForm.module.css";
import React, {FC} from "react";
import cn from "classnames";
import {AppDispatch} from '../../store/store'
import {useDispatch} from 'react-redux'
import { addMessage } from '../../store/dialogsSlice';

const DialogsForm: FC= () => {
    const dispatch: AppDispatch = useDispatch()

    const submit = (formData: FormikValues) => {
        dispatch(addMessage(formData.message))
        formData.message = ''
    }

    return (
        <Formik initialValues={{message: ''}}
                onSubmit={submit}>
            {({errors}) =>
                <Form className={style.form}>
                    <Field name={"message"}
                           component={"textarea"}
                           placeholder={"Write a message..."}
                           validate={required}
                           className={cn(style.formTextarea, errors.message ? style.errorTextarea : undefined)}
                    />
                    <button className={style.btn} type={"submit"}>Send message</button>
                </Form>
            }
        </Formik>
    )
}

export default DialogsForm;