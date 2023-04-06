import { createContext, useContext, useState } from "react";
import{ getClientSocket } from "./ConnectionContext";
import TcpSocket from "react-native-tcp-socket";
import { getLocalInformation } from "../util/generateQRCode";

type CreateGroupeContextType ={
    clientSocket: TcpSocket.Socket | null

}

const defaultValues:CreateGroupeContextType ={
    clientSocket: null
} 

const CreateGroupContext = createContext<CreateGroupeContextType>(defaultValues)

export const useCreateGroupContext = () => useContext(CreateGroupContext)

async function CreateGroupContextProvider(){
    const clientSocket = getClientSocket
    if(clientSocket == null){
        
    } else {
       
    }
    //if clientsocket == null => socket vorhanden eigene daten anzeigen
    //else socketaden anzeigen mit flag für gruppe
}