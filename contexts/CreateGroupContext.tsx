import { createContext, useContext, useState } from "react";

type CreateGroupeContextType = {
    group: boolean,
    setGroup:(newGroup: boolean) => void 
}

const defaultValues:CreateGroupeContextType = {
    group: false,
    setGroup: () => {}
}

const CreateGroupContext = createContext<CreateGroupeContextType>(defaultValues)

export const useCreateGroupContext = () => useContext(CreateGroupContext)

function CreateGroupContextProvider({children}:{children: React.ReactNode}) {
    const [group, setGroup] = useState(false)    

    return (
        <CreateGroupContext.Provider value={{
            group,
            setGroup
        }}>
            {children}
        </CreateGroupContext.Provider>
    )
}

export default CreateGroupContextProvider





