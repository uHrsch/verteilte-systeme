import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import Rocket from "../assets/rocket-ship.svg"
import { defaultStyles } from "../styles/styles"

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    text: {
        fontWeight: "bold",
        fontSize: 20
    },
    loadingSpinner: {
        position: "absolute",
        bottom: 50,
    }
})

function InitialLoad() {
    return (
        <View style={[defaultStyles.container, styles.container]}>
                <Rocket width={150} height={150}/>
                <Text style={[defaultStyles.text, styles.text]}>Getting things ready, please wait!</Text>
                <Text style={[defaultStyles.text, styles.text]}>This can take up to a minute.</Text>
                <ActivityIndicator
                    size={50}
                    color="white"
                    style={styles.loadingSpinner}
                />
        </View>
    )
}

export default InitialLoad