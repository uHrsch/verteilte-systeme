import { KeyboardAvoidingView, FlatList, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import IconButton from "../components/IconButton";
import { defaultStyles } from "../styles/styles";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: 1,
    },
    inputContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopColor: "white",
        borderTopWidth: 1,
        flexDirection: "row",
        gap: 10,
    },
    item: {
        marginBottom: 20,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        width: "80%",
    },
    itemSelf: {
        marginLeft: "auto",
        backgroundColor: "#6398c8",
    },
    firstItem: {
        marginTop: 20,
    },
    textInput: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        flexGrow: 1,
    }
})

function Chat() {
    return (
        <KeyboardAvoidingView style={{...defaultStyles.container, ...styles.container}}>
            <View>
                <Text style={{...defaultStyles.header, ...defaultStyles.text}}>Chat</Text>
            </View>
            <FlatList
                data={[
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: false,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: false,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: false,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: false,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: false,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: false,
                    },
                    {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloribus ratione in temporibus dignissimos, consectetur magnam iusto, neque porro sapiente quos nemo ab animi ipsa debitis veniam incidunt unde quibusdam.",
                        self: true,
                    },

                ]}
                renderItem={(item) => (
                    <View style={{
                        ...defaultStyles.primaryContainer, 
                        ...styles.item, 
                        ...(item.item.self ? styles.itemSelf : {}),
                        ...(item.index == 0 ? styles.firstItem : {})
                    }}>
                        <Text style={defaultStyles.text}>
                            {item.item.text}
                        </Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Input your message"
                    style={styles.textInput}
                />
                <IconButton icon="send"/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Chat