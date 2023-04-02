import { ActivityIndicator, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loadingSpinner: {
        marginTop: 40,
        flex: 1,
        justifyContent: "flex-start"
    }
})

function LoadingSpinner() {
    return (
        <ActivityIndicator
            size={50}
            color="white"
            style={styles.loadingSpinner}
        />
    )
}

export function LoadingSpinnerUnstyled() {
    return (
        <ActivityIndicator
            size={50}
            color="white"
        />
    )
}

export default LoadingSpinner