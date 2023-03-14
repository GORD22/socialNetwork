import React from "react";
import {Field, Form, Formik} from "formik";
import style from "./ProfileInfoForm.module.css";
import cn from "classnames";

const ProfileInfoForm = ({profile, saveProfile, setEditMode}) => {
    return (
        <Formik initialValues={profile} onSubmit={(formData) => {
            saveProfile(formData);
            setEditMode(false);
        }}>
            {({errors}) =>
                <Form>
                    <div>
                        <b> Name: </b>
                        <Field name={"fullName"}
                               component={"input"}
                               placeholder={"Your name"}
                        />
                    </div>
                    <div>
                        <b>Looking for a job </b>
                        <Field name={"lookingForAJob"}
                               component={"input"}
                               type={"checkBox"}
                        />
                    </div>
                    <div>
                        <b>Search job status: </b>
                        <Field name={"lookingForAJobDescription"}
                               component={"input"}
                               placeholder={"Your job status"}
                        />
                    </div>
                    <div>
                        <b>About me: </b>
                        <Field name={"aboutMe"}
                               component={"input"}
                               placeholder={"Tell about yourself"}
                        />
                    </div>
                    <div>
                        <b>Contacts: </b>
                        {
                            Object.keys(profile.contacts).map(key => {
                                return (
                                    <div key={key}>
                                        <b>{key}: </b>
                                        <Field name={`contacts.${key}`}
                                               component={"input"}
                                               placeholder={`Your ${key}`}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button type={"submit"}>Save information</button>
                    </div>
                </Form>
            }
        </Formik>
    )
}

export default ProfileInfoForm;