import ConnectionContextProvider from "../contexts/ConnectionContext"
import EditIconContextProvider from "../contexts/EditIconContext"
import StorageContextProvider from "../contexts/StorageContext"

function ContextChain({children}: {children: React.ReactNode}) {
    return (
        <EditIconContextProvider>
            <StorageContextProvider>
                <ConnectionContextProvider>
                        {children}
                </ConnectionContextProvider>
            </StorageContextProvider>
        </EditIconContextProvider>
    )
}

export default ContextChain