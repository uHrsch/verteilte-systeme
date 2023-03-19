import { createContext, useContext, useEffect, useState } from "react"
import { Message } from "../types/message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useConnectionContext } from "./ConnectionContext"

type StorageContextType = {
    getConversationIds: () => Promise<string[]>
    setConversation: (id: string  | null) => Promise<void>,
    activeConversation: string | null,
    storeMessage: (text: string) => void,
    changeName: (newName: string) => void,
    getMessages: () => Message[] | null,
    getName: (id?: string) => Promise<string>,
}

const defaultValues:StorageContextType = {
    getConversationIds: async () => [],
    setConversation: async ()  => {},
    activeConversation: null,
    storeMessage: () => {},
    changeName: () => {},
    getMessages: () => null,
    getName: async () => "Error",
}

const StorageContext = createContext<StorageContextType>(defaultValues)

export const useStorageContext = () => useContext(StorageContext)

function StorageContextProvider({children}:{children: React.ReactNode}) {

    const [conversation, _setConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[] | null>(null)
    const [name, setName] = useState<string | null>(null)

    const { sendMessage, off, on } = useConnectionContext()

    useEffect(() => {
        on((message) => {
            storeMessage(message)
        })

        return () => {
            off()
        }
    }, [])

    const loadMessages = (id: string) => {
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

    const loadName = async (id: string) => {
        const nameOrNull = await AsyncStorage.getItem(`name.${id}`)
        if(nameOrNull == null) return id;

        return nameOrNull
    }

    const getConversationIds = async () => {
        return (await AsyncStorage.getAllKeys())
            .filter(e => e.startsWith("chat."))
            .map(e => e.substring("chat.".length))
    }

    const setConversation = async (id: string | null) => {
        if(id === null) {
            _setConversation(null)
            setMessages(null)
            setName(null)
            return;
        }

        _setConversation(id)
        setMessages(loadMessages(id))
        setName(await loadName(id))
    }

    const storeMessage = (text: string) => {
        //TODO local storage
        sendMessage(text)
        setMessages(m => [
            {
                text,
                self: true,
            },
            ...(m ||[]),
        ])
    }
    const changeName = (name: string) => {
        if(conversation == null) return;

        AsyncStorage.setItem(`name.${conversation}`, name)
        setName(name)
    }
    const getMessages = () => messages
    const getName = async (id?: string) => {
        if(id === undefined) {
            if(name !== null) return name;
            return "Error 1"
        }
        return await loadName(id)
    }

    return (
        <StorageContext.Provider value={{
            getConversationIds,
            setConversation,
            activeConversation: conversation,
            storeMessage,
            changeName,
            getMessages,
            getName
        }}>
            {children}
        </StorageContext.Provider>
    )
}

export default StorageContextProvider