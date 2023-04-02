import { createContext, useContext, useState } from "react"
import TcpSocket from "react-native-tcp-socket"
import { Message, MessageDTO } from "../types/message"
import { getPublicKey } from "../util/keygen"
import { decrypt, encrypt } from '../util/encryptionUtils'
import { getLocalInformation } from "../util/generateQRCode"
import { useStorageContext } from "./StorageContext"

type ConnectionContextType = {
    openServer: () => void,
    connect: (ip: string, publicKey: string) => void,
    disconnect: () => void,
    sendMessage: (message: MessageDTO) => void,
    connectionStatus: ConnectionStatus,
    pubKey: string |null,
}

export enum ConnectionStatus {
    DISCONNECTED,
    CONNECTING,
    CONNECTED
};

const defaultValues:ConnectionContextType = {
    openServer: () => {},
    connect: () => {},
    disconnect: () => {},
    sendMessage: () => {},
    connectionStatus: ConnectionStatus.DISCONNECTED,
    pubKey: null,
}

const ConnectionContext = createContext<ConnectionContextType>(defaultValues)

export const useConnectionContext = () => useContext(ConnectionContext)
let serverSocket:TcpSocket.Server | null = null;
let clientSocket:TcpSocket.Socket | null = null;

function isSocketConnected() {
    return serverSocket != null || clientSocket != null
}

function ConnectionContextProvider({children}:{children: React.ReactNode}) {

    const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);
    const [pubKey, setPubKey] = useState<string | null>(null)

    const { setMessageHistory } = useStorageContext()

    const openServer = async () => {
        if(isSocketConnected()) {
            disconnect()
        }

        const localInformation = await getLocalInformation()

        serverSocket = TcpSocket.createServer((socket) => {

            clientSocket = socket

            socket.on("data", (rawData) => {
                
                const { type, data } = JSON.parse(rawData.toString())

                proccessIncomingTextMessage(type, data)

                if(type === "pubKey") {
                  setPubKey(data)
                  setConnectionStatus(ConnectionStatus.CONNECTED)
                }
            })

            socket.on("error", () => {
                disconnect()
            })
            socket.on("close", () => {
                disconnect()
            })
        }).listen({port: 9090, host: localInformation?.localIp ?? "0.0.0.0"})

        serverSocket.on("listening", () => {
            setConnectionStatus(ConnectionStatus.CONNECTING)
        })
        serverSocket.on("close", disconnect)
        serverSocket.on("error", disconnect)
    }

    const connect = async (ip: string, publicKey: string) => {
        if(isSocketConnected()) {
            disconnect()
        }

        setPubKey(publicKey)
        setConnectionStatus(ConnectionStatus.CONNECTING)
        const localInformation = await getLocalInformation()

        const options = {
            port: 9090,
            host: ip,
            localAddress: localInformation?.localIp ?? "127.0.0.1",
        }

        clientSocket = TcpSocket.createConnection(options, () => {   
            answerConnection();
            setConnectionStatus(ConnectionStatus.CONNECTED)
            
            clientSocket?.on("data", (rawData) => {                
                const { type, data } = JSON.parse(rawData.toString())

                proccessIncomingTextMessage(type, data)
            })
        })
        clientSocket.on("close", disconnect)
        clientSocket.on("error", disconnect)
    }

    const disconnect = () => {        
        setPubKey(null)
        setConnectionStatus(ConnectionStatus.DISCONNECTED)

        if(clientSocket != null) {
            clientSocket.destroy()
            clientSocket = null;
        }
        if(serverSocket != null) {
            serverSocket.close()
            serverSocket = null;
        }
    }

    const sendMessage = async (message: MessageDTO) => {
        if(clientSocket == null || pubKey == null) return;
        const encryptedMessage = await encrypt(JSON.stringify(message), pubKey);

        clientSocket.write(JSON.stringify({
            type: "message",
            data: encryptedMessage,
        })) 
    }

    const answerConnection = async () => {
        if(clientSocket == null) return;

        const pubKey = await getPublicKey()
        clientSocket.write(JSON.stringify({
            type: "pubKey",
            data: pubKey,
        }))
    }

    const proccessIncomingTextMessage = async (type: string, data: string) => {
        if(type === "message") {
            const decryptedMessage = await decrypt(data)
            const decryptedJsonMessage:MessageDTO = JSON.parse(decryptedMessage)

            const message: Message = {
                self: false,
                text: decryptedJsonMessage.text,
                timestamp: decryptedJsonMessage.timestamp
            }

            setMessageHistory(message)
        } 
    }

    return (
        <ConnectionContext.Provider value={{
            openServer,
            connect,
            disconnect,
            sendMessage,
            connectionStatus,
            pubKey,
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider