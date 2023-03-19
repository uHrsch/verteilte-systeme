import * as Network from "expo-network"
import { getPublicKey } from "./keygen"



export async function getLocalInformation(){    
    const networkState = await Network.getNetworkStateAsync()
    if(!networkState.isConnected) return null 

    const localIp = await Network.getIpAddressAsync()
    const pubKey = await getPublicKey()
    return {localIp, pubKey};
}
