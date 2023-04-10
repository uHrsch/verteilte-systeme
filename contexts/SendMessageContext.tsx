import { createContext, useContext } from "react"
import { Message, MessageDTO } from "../types/message"
import { useConnectionContext } from "./ConnectionContext"
import { useStorageContext } from "./StorageContext"
import { getPublicKey } from "../util/keygen"

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

        const timestamp = new Date().getTime()
        
        const message:Message = {
            text,
            self: true,
            timestamp 
        }

        getPublicKey()
        .then(pubKey => {
            const messageDTO: MessageDTO = {
                text,
                timestamp,
                origin: pubKey
            }
            connectionSendMessage(messageDTO)
        })
        

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