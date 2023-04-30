import ConnectionContextProvider from "../contexts/ConnectionContext"
import CreateGroupContextProvider from "../contexts/CreateGroupContext"
import EditIconContextProvider from "../contexts/EditIconContext"
import QrCodeContextProvider from "../contexts/QrCodeContext"
import RSAContextProvider from "../contexts/RSAContext"
import SendMessageProvider from "../contexts/SendMessageContext"
import StorageContextProvider from "../contexts/StorageContext"

function ContextChain({children}: {children: React.ReactNode}) {
    return (
        <RSAContextProvider>
            <EditIconContextProvider>
                <CreateGroupContextProvider>
                    <StorageContextProvider>
                        <ConnectionContextProvider>
                            <SendMessageProvider>
                                <QrCodeContextProvider>
                                    {children}
                                </QrCodeContextProvider>
                            </SendMessageProvider>
                        </ConnectionContextProvider>
                    </StorageContextProvider>
                </CreateGroupContextProvider>
            </EditIconContextProvider>
        </RSAContextProvider>
    )
}

export default ContextChain