import { Icon } from "@react-native-material/core";
import { Pressable, StyleSheet } from "react-native";
import { defaultStyles } from "../styles/styles";

const styles = StyleSheet.create({
    fab: {
        display: "flex",
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: 20,
        borderRadius: 1000,
    },
  });

function FloatingActionButton({icon, onPress}: {icon: string, onPress?: () => void}) {
    return (
        <Pressable style={{...styles.fab, ...defaultStyles.primaryContainer}} onPress={onPress}>
            <Icon name={icon} size={30} color="white"/>
        </Pressable>
    );
}

export default FloatingActionButton