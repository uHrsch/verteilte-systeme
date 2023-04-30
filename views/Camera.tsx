import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import { defaultStyles } from "../styles/styles";
import QrCodeScannerImage from "../assets/qrcode.svg"
import { ConnectionStatus, getClientSocket, useConnectionContext } from "../contexts/ConnectionContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { QrCodeContent } from "../types/qrCode";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
      },
    square: {
        width: 240,
        height: 240,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    loading: {
        position: "absolute",
        top: 100,
        left: 0,
        right: 0,
    }
});

type Permission = "NOT_SET" | "DENIED" | "ALLOWED"
type cameraProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

const Camera = () => {
    
    const [hasPermission, setHasPermission] = useState<Permission>("NOT_SET")
    const [scanned, setScanned] = useState(false)

    const { connect, connectionStatus } = useConnectionContext()
    const navigation = useNavigation<cameraProp>()

    useFocusEffect(useCallback(() => {
        setScanned(false)
    }, []))
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted' ? "ALLOWED" : "DENIED");
        };
      
        getBarCodeScannerPermissions();
    }, [])

    const handleBarCodeScanned = ({data}: BarCodeScannerResult) => {
        try {
            const qrCodeContent: QrCodeContent = JSON.parse(data)
            setScanned(true);

            connect(qrCodeContent)
            
        } catch(e) {

        }
    }

    useEffect(() => {

        if(connectionStatus == ConnectionStatus.CONNECTED) {
            navigation.navigate("Chat", {id: getClientSocket().pubKey})
        }

    }, [connectionStatus])

    if(hasPermission == "NOT_SET") {
        return (
            <View style={{
                ...defaultStyles.container,
                ...styles.container
            }}>
                <Text style={{
                    ...defaultStyles.text,
                    ...defaultStyles.scanme
                }}>Please accept the camera permissions request</Text>
            </View>
        )
    }

    if(hasPermission == "DENIED") {
        return (
            <View style={{
                ...defaultStyles.container,
                ...styles.container
            }}>
                <Text style={{
                    ...defaultStyles.text,
                    ...defaultStyles.scanme
                }}>No camera access permissions</Text>
            </View>
        )
    }

    return (
        <View style={{
            ...defaultStyles.container,
            ...styles.container
        }}>
            
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Text style={[defaultStyles.scanme, defaultStyles.text, {fontWeight: "bold"}]}>Scan me!</Text>
            <QrCodeScannerImage
                width={"80%"}
            />
            { scanned && (
                <ActivityIndicator
                    size={50}
                    color="white"
                    style={styles.loading}
                />
            )}
        </View>
    );
};

export default Camera;