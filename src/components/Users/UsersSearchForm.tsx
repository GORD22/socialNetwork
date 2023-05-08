import React, {FC} from 'react'
import {Field, Form, Formik} from 'formik'
import {AppDispatch} from '../../store/store'
import {useDispatch} from 'react-redux'
import {requestUsers} from '../../store/usersSlice'

type TProps = {
    pageSize: number
    term: string,
    friend: boolean | null
}

type TFilterData = {
    term: string
    friend: string
}

const UsersSearchForm: FC<TProps> = React.memo(({pageSize, term, friend}) => {
    const dispatch: AppDispatch = useDispatch()

    const convertFriend = (friend: string) => {
        return friend === 'null' ? null : friend === 'true'
    }
    const onSubmit = (filter: TFilterData, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const friend = convertFriend(filter.friend)

        dispatch(requestUsers(1, pageSize, filter.term, friend))
        setSubmitting(false)
    }

    return (
        <Formik initialValues={{term: term, friend: String(friend)}}
                enableReinitialize
                onSubmit={onSubmit}>
            {({isSubmitting}) => (
        <Form>
            <Field name={'term'} placeholder={'Search user'}/>
            <Field as={'select'} name={'friend'}>
                <option value={'null'}>All users</option>
                <option value={'true'}>Only followed</option>
                <option value={'false'}>Only unfollowed</option>
            </Field>
            <button type={'submit'} disabled={isSubmitting}>Search</button>
        </Form>
            )}
        </Formik>
    )
})

export default UsersSearchForm