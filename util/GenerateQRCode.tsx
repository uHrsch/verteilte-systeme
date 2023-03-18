import { RSAKeychain } from 'react-native-rsa-native'
import { NetworkInfo } from 'react-native-network-info'

function genKey(){
    RSAKeychain.generateKeys("myKey", 1024)
}

function getLocalInformation(){
    // Get Local IP
    const localIp = NetworkInfo.getIPAddress();
    const pubKey = RSAKeychain.getPublicKey('myKey');
    console.log(localIp);
    console.log(pubKey);
    return {localIp, pubKey};
}
