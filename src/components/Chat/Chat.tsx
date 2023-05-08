import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TChatMessageAPI } from '../../api/chatAPI'
import { getChatMessages, getChatStatus } from '../../store/chatSelector'
import { sendMessage, startMessagesListener, stopMessagesListener } from '../../store/chatSlice'
import { AppDispatch } from '../../store/store'



const Chat: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector(getChatStatus)

    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        dispatch(startMessagesListener())

        return () => {
            dispatch(stopMessagesListener())
        }
    }, [])


    return (
        <>
            <Messages isAutoScroll={isAutoScroll} setIsAutoScroll={setIsAutoScroll} />
            <AddMessageForm setIsAutoScroll={setIsAutoScroll} />
        </>
    )
}

type TMessagesProps = {
    isAutoScroll: boolean,
    setIsAutoScroll: (toggle: boolean) => void,
}

const Messages: FC<TMessagesProps> = ({ isAutoScroll, setIsAutoScroll }) => {
    const messages = useSelector(getChatMessages)
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            setIsAutoScroll(true)
        } else {
            setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            scrollToBottom()
        }
    }, [messages])

    return (
        <div style={{ height: '590px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m} />)}
            <div ref={messagesEndRef} />
        </div>
    )
}

const Message: FC<{ message: TChatMessageAPI }> = memo( ({ message }) => {
    return (
        <>
            <img src={message.photo} alt={''} style={{ width: '30px' }} /> <b>{message.userName}</b>
            <div>{message.message}</div>
        </>
    )
})

type TAddMessageFormProps = {
    setIsAutoScroll: (toggle: boolean) => void
}

const AddMessageForm: FC<TAddMessageFormProps> = ({ setIsAutoScroll }) => {
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector(getChatStatus)

    const submit = (formData: FormikValues, formik: FormikHelpers<{ message: string }>) => {
        dispatch(sendMessage(formData.message))
        setIsAutoScroll(true)
        formik.resetForm()
    }

    return (
        <Formik initialValues={{ message: '' }}
            enableReinitialize
            onSubmit={submit}>
            {({ errors, values }) =>
                <Form>
                    <div>
                        <Field name={'message'}
                            component={'textarea'}
                            type={'text'}
                            placeholder={'Write a message...'}
                        />
                    </div>
                    <div>
                        <button type={'submit'}
                            disabled={status !== 'ready' || values.message === ''}>Send message
                        </button>
                    </div>
                </Form>
            }
        </Formik>
    )
}

export default Chat