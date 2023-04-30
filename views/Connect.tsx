import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text,  View } from "react-native";
import FloatingActionButton from "../components/FloatingActionButton";
import QrCodeWithWrapper from "../components/QrCodeWithWrapper";
import { defaultStyles } from "../styles/styles";
import { getLocalInformation } from "../util/generateQRCode";
import { ConnectParams, RootStackParamList } from "./RootStackParams";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import * as Brightness from 'expo-brightness';
import { ConnectionStatus, getClientSocket, useConnectionContext } from "../contexts/ConnectionContext";
import { QrCodeContent } from "../types/qrCode";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

type connectProps = NativeStackNavigationProp<RootStackParamList, 'Connect'>;

function Connect({qrCodeContent}: ConnectParams) {

    const navigation = useNavigation<connectProps>();
    const [qrCodeInfo, setQrCodeInfo] = useState<QrCodeContent|undefined|null>(undefined)

    const { connectionStatus } = useConnectionContext()

    useEffect(() => {
        (async () => {
            Brightness.setBrightnessAsync(1);
            if (qrCodeContent) {
                setQrCodeInfo(qrCodeContent)
                return
            }
            let localInfo = await getLocalInformation()
            if(localInfo == null ||localInfo.localIp == null) {
                setQrCodeInfo(null)
                return;
            }

            setQrCodeInfo(localInfo)
        })()

        return () => {
            Brightness.restoreSystemBrightnessAsync()
        }
    }, [])

    useEffect(() => {
        if(connectionStatus == ConnectionStatus.CONNECTED) {
            navigation.navigate("Chat", {id: getClientSocket().pubKey})
        }
    }, [connectionStatus])

    return (
        <View style={{...styles.container, ...defaultStyles.container}}>
            {qrCodeInfo === null && (
                <Text style={[defaultStyles.scanme, defaultStyles.text]}>An error occured, please try again later</Text>
            )}
            {qrCodeInfo === undefined && (
                <LoadingSpinner/>
            )}
            {qrCodeInfo !== null && qrCodeInfo !== undefined && (
                <QrCodeWithWrapper text={JSON.stringify(qrCodeInfo)}/>
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