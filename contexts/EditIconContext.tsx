import { createContext, useContext, useState } from "react"

type EditIconContextType = {
    open: () => void
    close: () => void,
    isOpened: boolean
}

const defaultValues:EditIconContextType = {
    open: () => {},
    close: () => {},
    isOpened: false
}

const EditIconContext = createContext<EditIconContextType>(defaultValues)

export const useEditIconContext = () => useContext(EditIconContext)

function EditIconContextProvider({children}:{children: React.ReactNode}) {
    const [isOpened, setOpened] = useState(false)

    const open = () => setOpened(true)
    const close = () => setOpened(false)

    return (
        <EditIconContext.Provider value={{
            open,
            close,
            isOpened
        }}>
            {children}
        </EditIconContext.Provider>
    )
}

export default EditIconContextProvider