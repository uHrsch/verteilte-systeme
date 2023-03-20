import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text} from 'react-native';
import { defaultStyles } from "../styles/styles";
import QrCodeScannerImage from "../assets/qrcode.svg"
import { useConnectionContext } from "../contexts/ConnectionContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

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
});

type Permission = "NOT_SET" | "DENIED" | "ALLOWED"
type cameraProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

const Camera = () => {
    
    const [hasPermission, setHasPermission] = useState<Permission>("NOT_SET")
    const [scanned, setScanned] = useState(false)

    const { connect } = useConnectionContext()
    const navigation = useNavigation<cameraProp>()

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted' ? "ALLOWED" : "DENIED");
        };
      
        getBarCodeScannerPermissions();
    }, [])

    const handleBarCodeScanned = ({data}: BarCodeScannerResult) => {
        setScanned(true);
        const {localIp, pubKey} = JSON.parse(data)
        // connect(localIp, pubKey) TODO does not work with expo
        navigation.navigate("Chat", {id: pubKey})
    }

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
        </View>
    );
};

export default Camera;