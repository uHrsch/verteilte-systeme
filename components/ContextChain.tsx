import ConnectionContextProvider from "../contexts/ConnectionContext"
import CreateGroupContextProvider from "../contexts/CreateGroupContext"
import EditIconContextProvider from "../contexts/EditIconContext"
import RSAContextProvider from "../contexts/RSAContext"
import SendMessageProvider from "../contexts/SendMessageContext"
import StorageContextProvider from "../contexts/StorageContext"

function ContextChain({children}: {children: React.ReactNode}) {
    return (
        <RSAContextProvider>
            <EditIconContextProvider>
                <StorageContextProvider>
                    <ConnectionContextProvider>
                        <SendMessageProvider>
                            <CreateGroupContextProvider>
                                {children}
                            </CreateGroupContextProvider>
                        </SendMessageProvider>
                    </ConnectionContextProvider>
                </StorageContextProvider>
            </EditIconContextProvider>
        </RSAContextProvider>
    )
}

export default ContextChain