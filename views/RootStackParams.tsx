export type RootStackParamList = {
    Chats: undefined;
    Camera: undefined;
    Connect: undefined;
    Chat: ChatParams;
};

export type ChatParams = {
    ip?: string
    id: string,
}