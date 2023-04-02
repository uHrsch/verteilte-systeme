import { createContext, useContext } from "react"
import { Message } from "../types/message"
import { useConnectionContext } from "./ConnectionContext"
import { useStorageContext } from "./StorageContext"

type SendMessageontextType = {
    sendMessage: (text: string) => void,
}

const defaultValues:SendMessageontextType = {
    sendMessage: () => [],
}

const SendMessageContext = createContext<SendMessageontextType>(defaultValues)

export const useSendMessageContext = () => useContext(SendMessageContext)

function SendMessageProvider({children}:{children: React.ReactNode}) {

    const { sendMessage: connectionSendMessage } = useConnectionContext()
    const { setMessageHistory } = useStorageContext()

    const sendMessage = (text: string) => {

        const message:Message = {
            text,
            self: true,
            timestamp: new Date().getTime()
        }

        connectionSendMessage(message)
        setMessageHistory(message)
    }

    return (
        <SendMessageContext.Provider value={{
            sendMessage
        }}>
            {children}
        </SendMessageContext.Provider>
    )
}

export default SendMessageProvider