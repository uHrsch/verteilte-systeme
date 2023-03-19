// @ts-ignore
const RSAKey = require("react-native-rsa")
//import RSAKey from 'react-native-rsa'
import * as Network from "expo-network"
import * as SecureStore from 'expo-secure-store';

async function genKey(){
    //REMOVE AFTER TESTING
    //await SecureStore.deleteItemAsync("keypair.public")

    const pubkey = await SecureStore.getItemAsync("keypair.public")
    if(pubkey !== null) return;

    const rsa = new RSAKey()
    rsa.generate(1024, '10001');

    await SecureStore.setItemAsync("keypair.public", rsa.getPublicString())
    await SecureStore.setItemAsync("keypair.private", rsa.getPrivateString())
}

export async function getLocalInformation(){
    genKey()
    // Get Local IP
    
    const networkState = await Network.getNetworkStateAsync()
    if(!networkState.isConnected) return null 

    const localIp = await Network.getIpAddressAsync()
    const pubKey = await SecureStore.getItemAsync("keypair.public")
    return {localIp, pubKey};
}
