import ChatFunctionContextProvider from "../contexts/ChatFunctionContext"
import EditIconContextProvider from "../contexts/EditIconContext"

function ContextChain({children}: {children: React.ReactNode}) {
    return (
        <EditIconContextProvider>
            <ChatFunctionContextProvider>
                {children}
            </ChatFunctionContextProvider>
        </EditIconContextProvider>
    )
}

export default ContextChain