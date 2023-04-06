import { KeyboardAvoidingView, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/IconButton";
import { defaultStyles } from "../styles/styles";
import { ChatParams } from "./RootStackParams";
import { useEffect, useState } from "react"
import ChangeNameModal from "../components/ChangeNameModal";
import { useEditIconContext } from "../contexts/EditIconContext";
import { useStorageContext } from "../contexts/StorageContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { ConnectionStatus, useConnectionContext } from "../contexts/ConnectionContext";
import { useSendMessageContext } from "../contexts/SendMessageContext";

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
    loadingSpinner: {
        marginTop: 40,
        flex: 1,
        justifyContent: "flex-start"
    }
})

function Chat({id}: ChatParams) {

    const [input, setInput] = useState("")
    
    const { connectionStatus, disconnect } = useConnectionContext()
    const { isOpened, close } = useEditIconContext()
    const { setConversation, getName ,getMessages, changeName } = useStorageContext()
    const { sendMessage: sendMessageInternal } = useSendMessageContext()
    const messages = getMessages()

    useEffect(() => {
        (async () => {
            await setConversation(id)
            const name = await getName(id)
        })()

        return () => {
            setConversation(null)
            disconnect() //könnte probleme verursachen
        }
    }, [])

    const sendMessage = () => {
        sendMessageInternal(input)
        setInput("")
    }

    const changeNameInternal = (newName: string) => {
        changeName(newName)
    }

    return (
        <KeyboardAvoidingView 
            style={{...defaultStyles.container, ...styles.container}}
        >
            {messages === null ? (
                <LoadingSpinner/>
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

            
            {connectionStatus==ConnectionStatus.CONNECTED && (
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
            <ChangeNameModal id={id} isOpened={isOpened} close={close} changeName={changeNameInternal}/>
        </KeyboardAvoidingView>
    )
}

export default Chat