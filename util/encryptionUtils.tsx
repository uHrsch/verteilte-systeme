import { getPrivateKey } from "./keygen";

// @ts-ignore
const RSAKey = require("react-native-rsa")

export async function encrypt(message: string, key: string):Promise<string> {
    const rsa = new RSAKey();
    rsa.setPublicString(key)
    return rsa.encrypt(message)
}

export async function decrypt(message: string):Promise<string> {
    const rsa = new RSAKey();
    const privateKey = await getPrivateKey()
    rsa.setPrivateString(privateKey)
    return rsa.decrypt(message)
}