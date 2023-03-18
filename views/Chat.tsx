import { KeyboardAvoidingView, FlatList, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import IconButton from "../components/IconButton";
import { defaultStyles } from "../styles/styles";
import { ChatParams } from "./RootStackParams";
import { useState } from "react"

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
        marginTop: 20,
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
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        flexGrow: 1,
    }
})

function Chat({name, ip}: ChatParams) {

    const [input, setInput] = useState("")

    const sendMessage = () => {
        setInput("")
    }

    return (
        <KeyboardAvoidingView 
            style={{...defaultStyles.container, ...styles.container}}
        >
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
                    }} key={item.index}>
                        <Text style={defaultStyles.text}>
                            {item.item.text}
                        </Text>
                    </View>
                )}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Input your message"
                    style={styles.textInput}
                    blurOnSubmit={false}
                    returnKeyType="none"
                    multiline
                    value={input}
                   onChangeText={text => setInput(text)}
                />
                <View style={{
                    marginTop: "auto",
                }}>
                    <IconButton icon="send" onPress={sendMessage}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Chat