import React from "react";
import {Field, Form, Formik} from "formik";
import {emailValidator, required} from "../../utils/validators/validators";
import style from "./LoginForm.module.css";
import {Navigate} from "react-router-dom";

const LoginForm = ({isAuth, captcha, login}) => {
    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return (
        <Formik initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
                onSubmit={(formData) => login(formData)}>
            {({errors, touched}) =>
                <Form className={style.form}>
                    <h1>Login</h1>
                    <div>
                        <div>
                            <label>Email</label>
                        </div>
                        <Field name={"email"}
                               component={"input"}
                               placeholder={"Email..."}
                               validate={emailValidator}
                               className={errors.email && touched.email ? style.errorInput : undefined}
                        />
                        {
                            errors.email && touched.email &&
                            <div className={style.error}>{errors.email}</div>
                        }
                    </div>
                    <div>
                        <div>
                            <label>Password</label>
                        </div>
                        <Field name={"password"}
                               component={"input"}
                               placeholder={"Password..."}
                               type={"password"}
                               validate={required}
                               className={errors.password && touched.password ? style.errorInput : undefined}
                        />
                        {
                            errors.password && touched.password &&
                            <div className={style.error}>{errors.password}</div>
                        }
                    </div>
                    <div>
                        <label>Remember me</label>
                        <Field name={"rememberMe"}
                               component={"input"}
                               type={"checkBox"}
                        />
                    </div>
                    {
                        captcha &&
                        <div>
                            <img src={captcha} alt=""/>
                            <div>
                                <Field name={"captcha"}
                                       component={"input"}
                                       placeholder={"Text from the picture..."}
                                       validate={required}
                                       className={errors.captcha && touched.captcha ? style.errorInput : undefined}
                                />
                            </div>
                        </div>
                    }
                    <button type={"submit"}>Login</button>
                </Form>
            }
        </Formik>
    )
}

export default LoginForm;