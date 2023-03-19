// @ts-ignore
const RSAKey = require("react-native-rsa")
import * as SecureStore from 'expo-secure-store';

export async function genKey(){
    //REMOVE AFTER TESTING
    await SecureStore.deleteItemAsync("keypair.public")

    const pubkey = await SecureStore.getItemAsync("keypair.public")
    if(pubkey !== null) return;

    const rsa = new RSAKey()
    rsa.generate(1024, '10001');

    await SecureStore.setItemAsync("keypair.public", rsa.getPublicString())
    await SecureStore.setItemAsync("keypair.private", rsa.getPrivateString())
}

export async function getPublicKey(){
    return await SecureStore.getItemAsync("keypair.public") ?? ""
}

export async function getPrivateKey(){
    return await SecureStore.getItemAsync("keypair.private") ?? ""
}