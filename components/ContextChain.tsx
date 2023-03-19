import ConnectionContextProvider from "../contexts/ConnectionContext"
import EditIconContextProvider from "../contexts/EditIconContext"
import RSAContextProvider from "../contexts/RSAContext"
import StorageContextProvider from "../contexts/StorageContext"

function ContextChain({children}: {children: React.ReactNode}) {
    return (
        <RSAContextProvider>
            <EditIconContextProvider>
                <StorageContextProvider>
                    <ConnectionContextProvider>
                            {children}
                    </ConnectionContextProvider>
                </StorageContextProvider>
            </EditIconContextProvider>
        </RSAContextProvider>
    )
}

export default ContextChain