import { createContext, useContext, useState } from "react"

type Message = {
    text: string,
    self: boolean,
}

type ChatFunctionContextType = {
    setConversation: (id: string  | null) => void,
    sendMessage: (text: string) => void,
    changeName: (newName: string) => void,
    getMessages: () => Message[] | null,
    getName: (id?: string) => string,
}

const defaultValues:ChatFunctionContextType = {
    setConversation: ()  => {},
    sendMessage: () => {},
    changeName: () => {},
    getMessages: () => null,
    getName: () => "Error",
}

const ChatFunctionContext = createContext<ChatFunctionContextType>(defaultValues)

export const useChatFunctionContext = () => useContext(ChatFunctionContext)

function ChatFunctionContextProvider({children}:{children: React.ReactNode}) {
    
    const [id, setId] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[] | null>(null)

    const loadMessagesFromId = (id: string): Message[] => {
        return [{
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: false,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: false,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: false,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: false,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: false,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: false,
        },
        {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
            self: true,
        }]
    }

    const setConversation = (id: string | null) => {
        if(id == null) {
            console.log("remove conversation")
            setMessages(null)
            setId(null)
            return;
        }

        console.log("load conversation")
        setId(id)
        setTimeout(() => {
            console.log("set messages")
            setMessages(loadMessagesFromId(id))
        }, 1000)
    }

    const sendMessage = (text: string) => {

    }

    const changeName = (text: string) => {

    }

    const getMessages = () => {
        return messages
    }

    const getName = (_id?: string) => {
        if(_id === undefined) {
            if(id === null) {
                return "N/A"
            } else {
                return getNameFromId(id)
            }
        }
        return getNameFromId(_id)
    }

    const getNameFromId = (_id: string) => {
        return "Hehe" + _id
    }

    return (
        <ChatFunctionContext.Provider value={{
            setConversation,
            sendMessage,
            changeName,
            getMessages,
            getName
        }}>
            {children}
        </ChatFunctionContext.Provider>
    )
}

export default ChatFunctionContextProvider