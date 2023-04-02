import { Button, Icon, Text } from "@react-native-material/core";
import { StyleSheet, View } from "react-native";
import { useStorageContext } from "../contexts/StorageContext";
import { defaultStyles } from "../styles/styles";

function Settings() {

    const { deleteAll } = useStorageContext()

    const styles = StyleSheet.create({
        dangerTitle: {
            fontSize: 24,
            color: "red"
        },
        dangerView: {
            padding: 20,
            backgroundColor: "#443333",
            borderRadius: 5
        },
        dangerText: {
            marginVertical: 20,
        }
    })

    return (
        <View>
            <View style={styles.dangerView}>
                <Text style={styles.dangerTitle}>DANGER AREA!</Text>
                <Text style={[defaultStyles.text, styles.dangerText]}>Only press these buttons, if you know, what you are doing!</Text>
                <Button 
                    title="Delete Data" 
                    style={defaultStyles.primaryContainer}
                    onPress={deleteAll}
                    leading={props => <Icon name="delete" {...props} />} />
            </View>
        </View>
    )
}

export default Settings