import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text,  View } from "react-native";
import FloatingActionButton from "../components/FloatingActionButton";
import QrCodeWithWrapper from "../components/QrCodeWithWrapper";
import { defaultStyles } from "../styles/styles";
import { getLocalInformation } from "../util/generateQRCode";
import { RootStackParamList } from "./RootStackParams";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import * as Brightness from 'expo-brightness';
import { useConnectionContext } from "../contexts/ConnectionContext";

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

    const { openServer } = useConnectionContext()

    useEffect(() => {
        (async () => {
            const localInfo = await getLocalInformation()
            if(localInfo == null ||localInfo.localIp == null) {
                setQrCodeInfo(null)
                return;
            }
            openServer()
            setQrCodeInfo(JSON.stringify(localInfo))

            Brightness.setBrightnessAsync(1);
        })()

        return () => {
            Brightness.restoreSystemBrightnessAsync()
        }
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