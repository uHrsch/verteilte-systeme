import { QrCodeContent } from "../types/qrCode";

export type RootStackParamList = {
    Chats: undefined;
    Camera: undefined;
    Connect: ConnectParams;
    Chat: ChatParams;
    Settings: undefined;
};

export type ChatParams = {
    id: string,
}

export type ConnectParams = {
    qrCodeContent?: QrCodeContent | null
}