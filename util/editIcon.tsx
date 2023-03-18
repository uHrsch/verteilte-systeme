let callback: (() => void) | null = null;

export const registerEditCallback = (_callback: () => void) => {
    callback = _callback
}

export const getCallback = () => {
    return callback
}