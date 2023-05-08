import React, {FC} from 'react'
import {Field, Form, Formik} from 'formik'
import {ProfileType} from '../../../types/types'
import {AppDispatch} from '../../../store/store'
import {useDispatch} from 'react-redux'
import { saveProfile } from '../../../store/profileSlice'

type TProps = {
    profile: ProfileType | null
    setEditMode: (toggle: boolean) => void
}

const ProfileInfoForm: FC<TProps> = ({profile, setEditMode}) => {
    const dispatch: AppDispatch = useDispatch()

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
        setEditMode(false)
    }

    return (
        profile &&
        <Formik initialValues={profile} onSubmit={onSubmit}>
            {({errors}) =>
                <Form>
                    <div>
                        <b> Name: </b>
                        <Field name={'fullName'}
                               component={'input'}
                               placeholder={'Your name'}
                        />
                    </div>
                    <div>
                        <b>Looking for a job </b>
                        <Field name={'lookingForAJob'}
                               component={'input'}
                               type={'checkBox'}
                        />
                    </div>
                    <div>
                        <b>Search job status: </b>
                        <Field name={'lookingForAJobDescription'}
                               component={'input'}
                               placeholder={'Your job status'}
                        />
                    </div>
                    <div>
                        <b>About me: </b>
                        <Field name={'aboutMe'}
                               component={'input'}
                               placeholder={'Tell about yourself'}
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
                                               component={'input'}
                                               placeholder={`Your ${key}`}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button type={'submit'}>Save information</button>
                    </div>
                </Form>
            }
        </Formik>
    )
}

export default ProfileInfoForm