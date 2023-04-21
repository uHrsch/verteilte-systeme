import { createContext, useContext, useState } from "react"
import { Message } from "../types/message"
import AsyncStorage from "@react-native-async-storage/async-storage"

type StorageContextType = {
    getConversationIds: () => Promise<string[]>
    setConversation: (id: string  | null) => Promise<void>,
    setMessageHistory: (message: Message) => void,
    changeName: (newName: string) => void,
    getMessages: () => Message[] | null,
    getName: (id?: string) => Promise<string>,
    deleteAll: () => Promise<void>,
}

const defaultValues:StorageContextType = {
    getConversationIds: async () => [],
    setConversation: async ()  => {},
    setMessageHistory: () => {},
    changeName: () => {},
    getMessages: () => null,
    getName: async () => "Error",
    deleteAll: async () => {},
}

const StorageContext = createContext<StorageContextType>(defaultValues)

export const useStorageContext = () => useContext(StorageContext)

function StorageContextProvider({children}:{children: React.ReactNode}) {

    const [conversation, _setConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[] | null>(null)
    const [name, setName] = useState<string | null>(null)

    const loadMessages = async (id: string) => {
        const loadedMessages = await AsyncStorage.getItem(`chat.${id}`) ?? "[]"
        const loadedChat =  JSON.parse(loadedMessages)
        return loadedChat
    }

    const loadName = async (id: string) => {
        const storageKey = `name.${id}`
        const nameBeforeNullCheck = await AsyncStorage.getItem(storageKey)
        if(nameBeforeNullCheck == null) {
            const newIndex = await (await getConversationIds()).length + 1
            setNameInternal(id, `Chat ${newIndex}`)
        }

        const nameOrNull = await AsyncStorage.getItem(storageKey)

        if(nameOrNull == null) {
            return "Error 2"
        }
        return nameOrNull
    }

    const getConversationIds = async () => {
        const keys = await AsyncStorage.getAllKeys()
        const chats = keys.filter(e => e.startsWith("chat."))
        const ids = chats.map(e => e.substring("chat.".length))
        return ids
    }

    const setConversation = async (id: string | null) => {
        
        if(id === null) {
            _setConversation(null)
            setMessages(null)
            setName(null)
            return;
        }

        _setConversation(id)
        setMessages(await loadMessages(id))
        setName(await loadName(id))
    }

    const setMessageHistory = (message: Message) => {
        _setConversation((conversationId) => {
            setMessages(oldMessages => {
                const newMessages = [
                    message,
                    ...(oldMessages ||[]),
                ]
                AsyncStorage.setItem(`chat.${conversationId}`, JSON.stringify(newMessages))
                return newMessages
            })
            return conversationId
        })
        
    }

    const changeName = (name: string) => {
        if(conversation == null) return;

        setNameInternal(conversation, name)
        setName(name)
    }

    const setNameInternal = async (id: string, name: string) => {
        await AsyncStorage.setItem(`name.${id}`, name)
    }

    const getMessages = () => messages
    const getName = async (id?: string) => {
        if(id === undefined) {
            if(name !== null) return name;
            return "Error 1"
        }
        return await loadName(id)
    }

    const deleteAll = async () => {
        const keys = (await AsyncStorage.getAllKeys())
            .filter(e => e.startsWith("chat.") || e.startsWith("name."))
        AsyncStorage.multiRemove(keys)
    }

    return (
        <StorageContext.Provider value={{
            getConversationIds,
            setConversation,
            setMessageHistory,
            changeName,
            getMessages,
            getName,
            deleteAll
        }}>
            {children}
        </StorageContext.Provider>
    )
}

export default StorageContextProvider