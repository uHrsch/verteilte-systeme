import { createContext, useContext, useEffect, useState } from "react"
import { genKey, getPrivateKey, getPublicKey } from "../util/keygen"
import InitialLoad from "../views/InitialLoad"

type RSAContextType = {
    publicKey: string,
    privateKey: string,
}

const defaultValues:RSAContextType = {
    publicKey: "",
    privateKey: ""
}

const RSAContext = createContext<RSAContextType>(defaultValues)

export const useRSAContext = () => useContext(RSAContext)

function RSAContextProvider({children}:{children: React.ReactNode}) {
    
    const [rsaReady, setRsaReady] = useState(false)
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")

    useEffect(() => {
        (async () => {
            await genKey()

            setPublicKey(await getPublicKey())
            setPrivateKey(await getPrivateKey())

            setRsaReady(true)
        })()
    }, [])

    return (
        <RSAContext.Provider value={{
            publicKey,
            privateKey
        }}>
            {rsaReady ? children : <InitialLoad/>}
        </RSAContext.Provider>
    )
}

export default RSAContextProvider