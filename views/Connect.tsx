import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
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
    }
  });

type connectProps = NativeStackNavigationProp<RootStackParamList, 'Connect'>;

function Connect() {

    const navigation = useNavigation<connectProps>();

    return (
        <View style={{...styles.container, ...defaultStyles.container}}>
            <QrCodeWithWrapper text="Peter Lustig, hehe!"/>
            <FloatingActionButton 
                icon="camera"
                onPress={() => navigation.navigate("Camera")}/>
        </View>
    );
}

export default Connect