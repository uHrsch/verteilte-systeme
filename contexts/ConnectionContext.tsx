import { createContext, useContext, useEffect, useState } from "react"
import TcpSocket from "react-native-tcp-socket"
import { Message, MessageDTO, SocketMessage } from "../types/message"
import { getPublicKey } from "../util/keygen"
import { decrypt, encrypt } from '../util/encryptionUtils'
import { getLocalInformation } from "../util/generateQRCode"
import { useStorageContext } from "./StorageContext"
import { QrCodeContent } from "../types/qrCode"
import { useCreateGroupContext } from "./CreateGroupContext"
import { AppState } from "react-native"

const PORT = 9092

type ConnectionContextType = {
    openServer: () => void,
    connect: (qrCodeContent: QrCodeContent) => void,
    disconnect: () => void,
    sendMessage: (message: MessageDTO) => void,
    connectionStatus: ConnectionStatus,
    isInGroup: boolean,
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
    isInGroup: false
}

const ConnectionContext = createContext<ConnectionContextType>(defaultValues)

export const useConnectionContext = () => useContext(ConnectionContext)
let serverSocket:TcpSocket.Server | null = null;
const connections = new Map<TcpSocket.Socket, string>()

export function getClientSocket() {
    return {
        socket: [...connections][0][0],
        pubKey: [...connections][0][1]
    }
};

function isSocketConnected() {
    return serverSocket != null
}

function ConnectionContextProvider({children}:{children: React.ReactNode}) {

    const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);
    const { group, setGroup } = useCreateGroupContext()
    
    const { setMessageHistory } = useStorageContext()

    useEffect(() => {
        openServer()

        const subscription = AppState.addEventListener("change", nextAppState => {
            if(nextAppState == "background") {
                shutdown()
            }
        })

        return () => {
            shutdown()
            subscription.remove()
        }
    }, [])

    const writeToSocket = (socket: TcpSocket.Socket, message: SocketMessage) => {
        socket.write(JSON.stringify(message))
    }

    const openServer = async () => {
        if(isSocketConnected()) {
            disconnect()
        }
        
        const localInformation = await getLocalInformation()

        serverSocket = TcpSocket.createServer((socket) => {
            
            setConnectionStatus(ConnectionStatus.CONNECTING)
            
            socket.on("data", (rawData) => {
                const message: SocketMessage = JSON.parse(rawData.toString())

                proccessIncomingTextMessage(message, socket)
                const { type } = message;

                if (type === "pubKey") {
                    connections.set(socket, message.data)
                    setConnectionStatus(ConnectionStatus.CONNECTED)
                }
                if (type === "groupChat") {
                    setGroup(true)
                    const groupChatMessage: SocketMessage = {
                        type: "groupChat"
                    }
                    connections.forEach((_, socket) => {
                        writeToSocket(socket, groupChatMessage)
                    })
                }
            })

            socket.on("error", () => {
                socket.destroy()
            })
            socket.on("close", () => {
                socket.destroy()
                connections.delete(socket)
                if(connections.size == 0){
                    setGroup(false)
                    setConnectionStatus(ConnectionStatus.DISCONNECTED)
                }
            })
        }).listen({port: PORT, host: localInformation?.localIp ?? "0.0.0.0"})

        serverSocket.on("close", () => {
            disconnect()
            serverSocket?.close()
        })
        serverSocket.on("error", (e) => {
            console.log(e)
            disconnect()
        })
    }

    const connect = async (qrCodeContent: QrCodeContent) => {
        if(isSocketConnected()) {
            disconnect()
        }

        setConnectionStatus(ConnectionStatus.CONNECTING)
        const localInformation = await getLocalInformation()
        
        const options = {
            port: PORT,
            host: qrCodeContent["localIp"],
            localAddress: localInformation?.localIp ?? "127.0.0.1",
        }
        const clientSocket = TcpSocket.createConnection(options, () => {   

            connections.set(clientSocket,qrCodeContent["pubKey"])
            answerConnection(qrCodeContent["group"]);

            clientSocket?.on("data", (rawData) => {
                const message: SocketMessage = JSON.parse(rawData.toString())
                proccessIncomingTextMessage(message, clientSocket)
            })

            setConnectionStatus(ConnectionStatus.CONNECTED)
        })
        clientSocket.on("close", disconnect)
        clientSocket.on("error", disconnect)
    }

    const disconnect = () => {    
        setConnectionStatus(ConnectionStatus.DISCONNECTED)
        connections.forEach((_, socket) => {
            socket.destroy()
        })
        connections.clear()
        setGroup(false)
    }
    
    const writeMessage = async (message:MessageDTO, pubKey: string, socket: TcpSocket.Socket) => {
        const encryptedText = await encrypt(message.text, pubKey);
        const messageWithEncryptedText: MessageDTO = {
            text: encryptedText,
            origin: message.origin,
            timestamp: message.timestamp,
        }
            
        writeToSocket(socket, {
            type: "message",
            data: messageWithEncryptedText,
        });
    }

    const sendMessage = async (message: MessageDTO) => {
        connections.forEach((pubKey, socket) => {
            writeMessage(message, pubKey, socket)
        }) 
    }


    const answerConnection = async (group: boolean) => {
        if(connections.size != 1) return;

        const pubKey = await getPublicKey()
        const pubKeyMessage: SocketMessage = {
            type: "pubKey",
            data: pubKey,
        }
        connections.forEach((_, socket) => {
            writeToSocket(socket, pubKeyMessage)
        })

        if(group){
            connections.forEach((_, socket) => {
                writeToSocket(socket,  {
                    type: "groupChat",
                })
            })
        }
    }



    const proccessIncomingTextMessage = async (incommingMessage: SocketMessage, sender: TcpSocket.Socket) => {
        const { type } = incommingMessage;
        if(type === "message") {
            const { data: jsonMessage } = incommingMessage
            
            const decryptedText = await decrypt(jsonMessage.text)

            const message: Message = {
                text: decryptedText,
                self: false,
                timestamp: jsonMessage.timestamp,
                origin: jsonMessage.origin,
            }

            const newMessageDTO: MessageDTO = {
                text: decryptedText,
                origin: jsonMessage.origin,
                timestamp: jsonMessage.timestamp,
            }

            connections.forEach((pubKey, socket) => {
                if (socket.address().toString() == sender?.address().toString()) return
                writeMessage(newMessageDTO, pubKey, socket)
            })
            setMessageHistory(message)
        }
        if(type === "groupChat") {
            setGroup(true)
        }
    }

    const shutdown = () => {
        disconnect()
        serverSocket?.close()
    }

    return (
        <ConnectionContext.Provider value={{
            openServer,
            connect,
            disconnect,
            sendMessage,
            connectionStatus,
            isInGroup: group
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider