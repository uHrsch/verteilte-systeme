import { StyleSheet, View } from "react-native";
import FloatingActionButton from "../components/FloatingActionButton";
import QrCodeWithWrapper from "../components/QrCodeWithWrapper";
import { defaultStyles } from "../styles/styles";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

function Connect() {
    return (
        <View style={{...styles.container, ...defaultStyles.container}}>
            <QrCodeWithWrapper text="Peter Lustig, hehe!"/>
            <FloatingActionButton icon="camera"/>
        </View>
    );
}

export default Connect