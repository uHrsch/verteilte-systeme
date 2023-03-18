import { Icon } from "@react-native-material/core";
import { Pressable, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "rgba(100, 100, 100, 0.5)",
        aspectRatio: "1/1",
        borderRadius: 5,
    }
})

function IconButton({icon, onPress}: {icon: string, onPress?: () => void}) {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Icon name={icon} size={30} color="white"/>
        </Pressable>
    )
}

export default IconButton