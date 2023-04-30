import { createContext, useContext } from "react"
import { getLocalInformation } from "../util/generateQRCode"
import { QrCodeContent } from "../types/qrCode"
import { getClientSocket } from "./ConnectionContext"

type QrCodeContextType = {
    getQrCodeContent: () => Promise<QrCodeContent | null>,
}

const defaultValues:QrCodeContextType = {
    getQrCodeContent: async () => {return null},
}

const QrCodeContext = createContext<QrCodeContextType>(defaultValues)

export const useQrCodeContext = () => useContext(QrCodeContext)

function QrCodeContextProvider({children}:{children: React.ReactNode}) {

    const getQrCodeContent = async () => {
        const connectionDetails = getClientSocket()
        const hostAddress = connectionDetails.socket.address()
        if(hostAddress && ("address" in hostAddress)) {
            return { localIp: hostAddress["address"] as string, pubKey: connectionDetails.pubKey, group: true }
        } 

        const localInformation = await getLocalInformation()
        if(localInformation == null) return null
        return {
            ...localInformation, 
            group: true
        }
    }

    return (
        <QrCodeContext.Provider value={{
            getQrCodeContent
        }}>
            {children}
        </QrCodeContext.Provider>
    )
}

export default QrCodeContextProvider