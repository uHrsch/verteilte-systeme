import * as Network from "expo-network"
import { getPublicKey } from "./keygen"
import { QrCodeContent } from "../types/qrCode"



export async function getLocalInformation(): Promise<QrCodeContent | null>{    
    const networkState = await Network.getNetworkStateAsync()
    if(!networkState.isConnected) return null 

    const localIp = await Network.getIpAddressAsync()
    const pubKey = await getPublicKey()
    return {localIp, pubKey, group: false};
}
