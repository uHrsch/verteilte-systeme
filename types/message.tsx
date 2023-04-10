export type Message = {
    text: string,
    self: boolean,
    timestamp: number,
    origin?: string,
}

export type MessageDTO = {
    text: string,
    timestamp: number,
    origin: string,
}