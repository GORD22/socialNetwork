import {Field, Form, Formik} from "formik";
import {required} from "../../../utils/validators/validators";
import style from "./MyPostsForm.module.css";
import React from "react";

const MyPostsForm = ({addPosts}) => {
    return (
        <div className={style.form}>
            <Formik initialValues={{postText: ''}}
                    onSubmit={formData => {
                        addPosts(formData.postText);
                        formData.postText = '';
                    }}>
                {({errors}) =>
                    <Form>
                        <Field name={"postText"}
                               component={"textarea"}
                               placeholder={"Write a post..."}
                               validate={required}
                               className={errors.postText ? style.errorTextarea : undefined}
                        />
                        {errors.postText &&
                            <div className={style.error}>{errors.postText}</div>}
                        <div>
                            <button type={"submit"}>Add post</button>
                        </div>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default MyPostsForm;