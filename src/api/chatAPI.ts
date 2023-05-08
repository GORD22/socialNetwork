let subscribers = {
    'messages-received': [] as TMessagesReceivedSubscriber[],
    'status-changed': [] as TStatusChangedSubscriber[]
} 

let wssChannel: WebSocket | null = null
const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const cleanUp = () => {
    wssChannel?.removeEventListener('close', closeHandler)
    wssChannel?.removeEventListener('message', messageHandler)
    wssChannel?.removeEventListener('open', openHandler)
    wssChannel?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: TStatus) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    wssChannel?.close()

    wssChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    wssChannel?.addEventListener('close', closeHandler)
    wssChannel?.addEventListener('message', messageHandler)
    wssChannel?.addEventListener('open', openHandler)
    wssChannel?.addEventListener('error', errorHandler)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('refresh page')
}

export const chatAPI = {
    start() {
        createChannel()
    },

    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []

        cleanUp()
        wssChannel?.close()
    },

    subscribe(eventName: TEventsNames, callback: TMessagesReceivedSubscriber | TStatusChangedSubscriber) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: TEventsNames,callback: TMessagesReceivedSubscriber | TStatusChangedSubscriber) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    
    sendMessage(message: string) {
        wssChannel?.send(message)
    }
}

type TEventsNames = 'messages-received' | 'status-changed'


type TMessagesReceivedSubscriber = (messages: TChatMessageAPI[]) => void
type TStatusChangedSubscriber = (status: TStatus) => void

export type TStatus = 'pending' | 'ready' | 'error';
export type TChatMessageAPI = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}