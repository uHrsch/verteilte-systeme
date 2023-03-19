import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text,  View } from "react-native";
import FloatingActionButton from "../components/FloatingActionButton";
import QrCodeWithWrapper from "../components/QrCodeWithWrapper";
import { defaultStyles } from "../styles/styles";
import { getLocalInformation } from "../util/GenerateQRCode";
import { RootStackParamList } from "./RootStackParams";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

type connectProps = NativeStackNavigationProp<RootStackParamList, 'Connect'>;

function Connect() {

    const navigation = useNavigation<connectProps>();
    const [qrCodeInfo, setQrCodeInfo] = useState<string|undefined|null>(undefined)

    useEffect(() => {
        (async () => {
            const localInfo = await getLocalInformation()
            if(localInfo == null ||localInfo.localIp == null /*|| localInfo.pubKey == undefined*/) {
                setQrCodeInfo(null)
                return;
            }
            setQrCodeInfo(JSON.stringify(localInfo))
        })()
    }, [])

    return (
        <View style={{...styles.container, ...defaultStyles.container}}>
            {qrCodeInfo === null && (
                <Text style={[defaultStyles.scanme, defaultStyles.text]}>An error occured, please try again later</Text>
            )}
            {qrCodeInfo === undefined && (
                <LoadingSpinner/>
            )}
            {qrCodeInfo !== null && qrCodeInfo !== undefined && (
                <QrCodeWithWrapper text={qrCodeInfo}/>
            )}
            <Text style={{
                ...defaultStyles.text,
                ...defaultStyles.scanme,
            }}>
                Let your friend scan this QR-Code to chat!
            </Text>
            <FloatingActionButton 
                icon="camera"
                onPress={() => navigation.navigate("Camera")}/>
        </View>
    );
}

export default Connect