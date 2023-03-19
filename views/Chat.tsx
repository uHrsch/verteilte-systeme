import { KeyboardAvoidingView, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/IconButton";
import { defaultStyles } from "../styles/styles";
import { ChatParams } from "./RootStackParams";
import { useEffect, useState } from "react"
import ChangeNameModal from "../components/ChangeNameModal";
import { useEditIconContext } from "../contexts/EditIconContext";
import { useChatFunctionContext } from "../contexts/ChatFunctionContext";
import { ActivityIndicator } from "@react-native-material/core";

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
    },
})

function Chat({id, ip}: ChatParams) {

    const [input, setInput] = useState("")
    
    const { isOpened, close } = useEditIconContext()
    const { setConversation, sendMessage: sendMessageInternal, getName ,getMessages, changeName } = useChatFunctionContext()
    const messages = getMessages()

    useEffect(() => {
        console.log("useeffect")
        setConversation(id)

        return () => {
            console.log("useeffect off")
            setConversation(null)
        }
    }, [])

    const sendMessage = () => {
        sendMessageInternal(input)
        setInput("")
    }

    return (
        <KeyboardAvoidingView 
            style={{...defaultStyles.container, ...styles.container}}
        >
            {messages === null ? (
                <ActivityIndicator
                    size={50}
                    color="white"
                    style={{
                        marginTop: 40
                    }}
                />
            ) : (
                <FlatList
                    data={messages}
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
            )}
            <Text>{id}</Text>

            
            {ip !== undefined && (
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
            )}

            <ChangeNameModal name={getName(id)} isOpened={isOpened} close={close} changeName={changeName}/>
        </KeyboardAvoidingView>
    )
}

export default Chat