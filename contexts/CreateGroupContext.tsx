import { createContext, useContext, useState } from "react";
import{ getClientSocket } from "./ConnectionContext";
import TcpSocket from "react-native-tcp-socket";

type CreateGroupeContextType ={
    clientSocket: TcpSocket.Socket | null

}

const defaultValues:CreateGroupeContextType ={
    clientSocket: null
} 

const CreateGroupContext = createContext<CreateGroupeContextType>(defaultValues)

export const useConnectionContext = () => useContext(CreateGroupContext)

function CreateGroupContextProvider({
    clientSocket = getClientSocket,
    //if clientsocket == null => socket vorhanden eigene daten anzeigen
    //else socketaden anzeigen mit flag für gruppe
})