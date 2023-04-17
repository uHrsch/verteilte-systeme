import { createContext, useContext, useEffect, useState } from "react"
import TcpSocket from "react-native-tcp-socket"
import { Message, MessageDTO } from "../types/message"
import { getPublicKey } from "../util/keygen"
import { decrypt, encrypt } from '../util/encryptionUtils'
import { getLocalInformation } from "../util/generateQRCode"
import { useStorageContext } from "./StorageContext"
import { QrCodeContent } from "../types/qrCode"

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

// TODO der Server sendet den clients nie die Info, dass eine Gruppe geöffnet wurde
// TODO group wird nie resettet
// TODO local history wird nicht umgangen, wenn group flag gesetzt

function ConnectionContextProvider({children}:{children: React.ReactNode}) {

    const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);
    const [group, setGroup] = useState(false)

    const { setMessageHistory } = useStorageContext()

    useEffect(() => {
        openServer()

        return () => {
            disconnect()
            serverSocket?.close()
        }
    }, [])

    const openServer = async () => {
        console.log("openserver")
        if(isSocketConnected()) {
            disconnect()
        }
        
        const localInformation = await getLocalInformation()

        serverSocket = TcpSocket.createServer((socket) => {

            socket.on("data", (rawData) => {
                console.log("server data")
                const { type, data } = JSON.parse(rawData.toString())

                proccessIncomingTextMessage(type, data, socket)

                if (type === "pubKey") {
                  connections.set(socket, data)
                  setConnectionStatus(ConnectionStatus.CONNECTED)
                }
                if (type === "groupChat") { //TODO das wird nie gesendet
                    setGroup(group => !group)
                }
            })

            socket.on("error", () => {
                console.log("server socket error")
                socket.destroy()
            })
            socket.on("close", () => {
                console.log("server socket close")
                socket.destroy()
            })
        }).listen({port: 9090, host: localInformation?.localIp ?? "0.0.0.0"})

        serverSocket.on("listening", () => {
            setConnectionStatus(ConnectionStatus.CONNECTING)
        })
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
            port: 9090,
            host: qrCodeContent["localIp"],
            localAddress: localInformation?.localIp ?? "127.0.0.1",
        }
        console.log("local connection start")
        const clientSocket = TcpSocket.createConnection(options, () => {   
            connections.set(clientSocket,qrCodeContent["pubKey"])
            
            answerConnection(qrCodeContent["group"]);
            setConnectionStatus(ConnectionStatus.CONNECTED)
            
            clientSocket?.on("data", (rawData) => {                
                const { type, data } = JSON.parse(rawData.toString())
                
                proccessIncomingTextMessage(type, data, clientSocket)
            })
        })
        clientSocket.on("close", disconnect)
        clientSocket.on("error", disconnect)
    }

    const disconnect = () => {    
        console.log("disconnect")    
        setConnectionStatus(ConnectionStatus.DISCONNECTED)
        connections.forEach((_, socket) => {
            socket.destroy()
        })
        connections.clear()
    }
    
    const writeMessage = async (message:MessageDTO, pubKey: string, socket: TcpSocket.Socket) => {
        const encryptedMessage = await encrypt(JSON.stringify(message), pubKey);
            
            socket.write(JSON.stringify({
                type: "message",
                data: encryptedMessage,
                sender: origin
            }))  
    }

    const sendMessage = async (message: MessageDTO) => {
        connections.forEach((pubKey, socket) => {
            writeMessage(message, pubKey, socket)
        }) 
    }


    const answerConnection = async (group: boolean) => {
        if(connections.size != 1) return;

        const pubKey = await getPublicKey()
        connections.entries().next().value.write(JSON.stringify({
            type: "pubKey",
            data: pubKey,
            groupFlag: group
        }))
    }



    const proccessIncomingTextMessage = async (type: string, data: string, sender: TcpSocket.Socket) => {
        if(type === "message") {
            
            const decryptedMessage = await decrypt(data)
            const decryptedJsonMessage:MessageDTO = JSON.parse(decryptedMessage)

            const message: Message = {
                text: decryptedJsonMessage.text,
                self: false,
                timestamp: decryptedJsonMessage.timestamp,
                origin: decryptedJsonMessage.origin,
            }
            connections.forEach((pubKey, socket) => {
                if (socket.address() == sender?.address()) return;
                writeMessage(decryptedJsonMessage, pubKey, socket)
            })
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
            isInGroup: group
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider