import { StyleSheet, View } from 'react-native';
import QRCode from "react-native-qrcode-svg";

const styles = StyleSheet.create({
    qrwrapper: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "white"
    }
  });

function QrCodeWithWrapper({text}: {text: string}) {
    return (
        <View style={styles.qrwrapper}>
            <QRCode
                value="Peter Lustig, hehe!"
                size={200}
            />
        </View>
    )
}

export default QrCodeWithWrapper