import { createContext, useContext, useState } from "react"
import TcpSocket from "react-native-tcp-socket"
import { MessageDTO } from "../types/message"
import { getPublicKey } from "../util/keygen"
import { decrypt, encrypt } from '../util/encryptionUtils'

type ConnectionContextType = {
    openServer: () => void,
    connect: (ip: string, publicKey: string) => void,
    disconnect: () => void,
    sendMessage: (message: MessageDTO) => void,
    on: (callback: (message: MessageDTO) => void) => void,
    off: () => void,
    connectionStatus: ConnectionStatus
}

enum ConnectionStatus {
    DISCONNECTED,
    CONNECTING,
    CONNECTED
};

const defaultValues:ConnectionContextType = {
    openServer: () => {},
    connect: () => {},
    disconnect: () => {},
    sendMessage: () => {},
    on: () => {},
    off: () => {},
    connectionStatus: ConnectionStatus.DISCONNECTED,
}

const ConnectionContext = createContext<ConnectionContextType>(defaultValues)

export const useConnectionContext = () => useContext(ConnectionContext)

function ConnectionContextProvider({children}:{children: React.ReactNode}) {

    const [callback, setCallback] = useState<((message: MessageDTO) => void) | null>()
    const [socket, setSocket] = useState<TcpSocket.Socket | null>(null)
    const [pubKey, setPubKey] = useState<string | null>()

    const openServer = () => {
        if(socket != null) {
            disconnect()
        }

        TcpSocket.createServer((socket) => {

            setSocket(socket)

            socket.on("data", (rawData) => {
                const { type, data } = JSON.parse(rawData.toString())

                proccessIncomingTextMessage(type, data)

                if(type === "pubKey") {
                  setPubKey(data)
                }
            })

            socket.on("error", () => {
                disconnect()
            })
            socket.on("close", () => {
                disconnect()
            })
        }).listen({port: 80, host: "0.0.0.0"})
    }

    const connect = (ip: string, publicKey: string) => {
        if(socket != null) {
            disconnect()
        }

        const options = {
            port: 80,
            host: ip,
            localAddress: "127.0.0.1",
        }

        const client = TcpSocket.createConnection(options, () => {
            client.on("data", (rawData) => {
                const { type, data } = JSON.parse(rawData.toString())

                proccessIncomingTextMessage(type, data)
            })
        })
        client.on("close", () => disconnect())
        client.on("error", () => {
            disconnect()
        })

        setSocket(client)
        answerConnection(ip, publicKey);
    }

    const disconnect = () => {
        setPubKey(null)

        if(socket == null) return;

        if(!socket.destroyed){
            socket.destroy()
        }
        
        setSocket(null)
    }

    const sendMessage = async (message: MessageDTO) => {
        if(socket == null || pubKey == null) return;
        const encryptedMessage = await encrypt(JSON.stringify(message), pubKey);

        socket.write(JSON.stringify({
            type: "message",
            data: encryptedMessage,
        })) 
    }

    const answerConnection = (ip: string, publicKey: string) => {
        getPublicKey()
        .then((text) => {
            const timestamp: number = Date.now();
            socket?.write(JSON.stringify({
                type: "pubKey",
                data: text,
            }))
        });

    }

    const on = (_callback: (message: MessageDTO) => void) => {
        setCallback(() => _callback)
    }

    const off = () => {
        setCallback(null)
    }

    const connectionStatus = (socket == null) ? ConnectionStatus.DISCONNECTED : (pubKey == null ? ConnectionStatus.CONNECTING : ConnectionStatus.CONNECTED);

    const proccessIncomingTextMessage = (type: string, data: string) => {
        if(type === "message" && callback) {
            decrypt(data)
            .then(
                decryptedMessage => JSON.parse(decryptedMessage)        
            )
            .then(
                message => callback(message as MessageDTO)
            )
        } 
    }

    return (
        <ConnectionContext.Provider value={{
            openServer,
            connect,
            disconnect,
            sendMessage,
            on,
            off,
            connectionStatus,
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider