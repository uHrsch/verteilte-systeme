export type RootStackParamList = {
    Chats: undefined;
    Camera: undefined;
    Connect: undefined;
    Chat: ChatParams;
};

export type ChatParams = {
    name: string,
    ip?: string
    id: string,
}