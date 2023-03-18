import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import FloatingActionButton from "../components/FloatingActionButton";
import QrCodeWithWrapper from "../components/QrCodeWithWrapper";
import { defaultStyles } from "../styles/styles";
import { RootStackParamList } from "./RootStackParams";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanme: {
        marginTop: 10,
        fontSize: 20,
    }
  });

type connectProps = NativeStackNavigationProp<RootStackParamList, 'Connect'>;

function Connect() {

    const navigation = useNavigation<connectProps>();

    return (
        <View style={{...styles.container, ...defaultStyles.container}}>
            <QrCodeWithWrapper text="Peter Lustig, hehe!"/>
            <Text style={{
                ...defaultStyles.text,
                ...styles.scanme,
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