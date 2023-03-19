import ConnectionContextProvider from "../contexts/ConnectionContext"
import EditIconContextProvider from "../contexts/EditIconContext"
import RSAContextProvider from "../contexts/RSAContext"
import StorageContextProvider from "../contexts/StorageContext"

function ContextChain({children}: {children: React.ReactNode}) {
    return (
        <RSAContextProvider>
            <EditIconContextProvider>
                <ConnectionContextProvider>
                    <StorageContextProvider>
                            {children}
                        </StorageContextProvider>
                </ConnectionContextProvider>
            </EditIconContextProvider>
        </RSAContextProvider>
    )
}

export default ContextChain