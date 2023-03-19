import { createContext, useContext, useState } from "react"
import TcpSocket from "react-native-tcp-socket"

type ConnectionContextType = {
    openServer: () => void,
    connect: (ip: string) => void,
    disconnect: () => void,
    sendMessage: (message: string) => void,
    on: (callback: (message: string) => void) => void,
    off: () => void,
    isConnected: boolean
}

const defaultValues:ConnectionContextType = {
    openServer: () => {},
    connect: () => {},
    disconnect: () => {},
    sendMessage: () => {},
    on: () => {},
    off: () => {},
    isConnected: false,
}

const ConnectionContext = createContext<ConnectionContextType>(defaultValues)

export const useConnectionContext = () => useContext(ConnectionContext)

function ConnectionContextProvider({children}:{children: React.ReactNode}) {

    const [callback, setCallback] = useState<((message: string) => void) | null>()
    const [socket, setSocket] = useState<TcpSocket.Socket | null>(null)

    const openServer = () => {
        if(socket != null) {
            socket.destroy()
        }

        TcpSocket.createServer((socket) => {

            setSocket(socket)

            socket.on("data", (data) => {
                if(callback) callback(data.toString())
            })

            socket.on("error", () => {
                socket.destroy()
                setSocket(null)
            })
            socket.on("close", () => {
                setSocket(null)
            })
        }).listen({port: 80, host: "0.0.0.0"})
    }

    const connect = (ip: string) => {
        if(socket != null) {
            socket.destroy()
        }

        const options = {
            port: 80,
            host: ip,
            localAddress: "127.0.0.1",
        }

        const client = TcpSocket.createConnection(options, () => {
            client.on("data", (data) => {
                if(callback) callback(data.toString())
            })
        })
        client.on("close", () => setSocket(null))
        client.on("error", () => {
            socket?.destroy()
            setSocket(null)
        })

        setSocket(client)
    }

    const disconnect = () => {
        if(socket == null) return;

        socket.destroy();
        setSocket(null)
    }

    const sendMessage = (message: string) => {
        if(socket == null) return;

        socket.write(message) //TODO encryption
    }

    const on = (_callback: (message: string) => void) => {
        setCallback(_callback)
    }

    const off = () => {
        setCallback(null)
    }

    const isConnected = socket != null;

    return (
        <ConnectionContext.Provider value={{
            openServer,
            connect,
            disconnect,
            sendMessage,
            on,
            off,
            isConnected,
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider