import { createContext, useContext, useState } from "react";
import TcpSocket from "react-native-tcp-socket";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../views/RootStackParams";
import { getClientSocket, useConnectionContext } from "./ConnectionContext";
import { QrCodeContent } from "../types/qrCode";
import { getLocalInformation } from "../util/generateQRCode";

type CreateGroupeContextType = {
    getQrCodeContent: () => Promise<QrCodeContent | null> 
}

const defaultValues:CreateGroupeContextType = {
    getQrCodeContent: async () => {return null}
}

const CreateGroupContext = createContext<CreateGroupeContextType>(defaultValues)

export const useCreateGroupContext = () => useContext(CreateGroupContext)

function CreateGroupContextProvider({children}:{children: React.ReactNode}) {
    
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
        <CreateGroupContext.Provider value={{
            getQrCodeContent
        }}>
            {children}
        </CreateGroupContext.Provider>
    )
}

export default CreateGroupContextProvider





