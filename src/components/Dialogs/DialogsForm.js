import {Field, Form, Formik} from "formik";
import {required} from "../../utils/validators/validators";
import style from "./DialogsForm.module.css";
import React from "react";
import cn from "classnames";

const DialogsForm = ({addMessage}) => {
    return (
        <Formik initialValues={{message: ''}}
                onSubmit={formData => {
                    addMessage(formData.message);
                    formData.message = ''
                }}>
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