import { Button, Modal, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { Pressable } from "@react-native-material/core"
import { defaultStyles } from "../styles/styles"

function ChangeNameModal({isOpened, close, changeName, name}: {isOpened: boolean, close: () => void, changeName: (name: string) => void, name: string}) {

    const [value, setValue] = useState(name)

    const editAndClose = () => {
        changeName(value)
        close()
    }

    return (
        <Modal 
            visible={isOpened}
            transparent
            onRequestClose={close}
        >
            <Pressable style={{
                backgroundColor: "rgba(100, 100, 100, 0.5)",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }} onPress={close}>
                <View style={{
                    ...defaultStyles.container,
                    padding: 20,
                    width: "90%",
                    borderRadius: 5,
                }}>
                    <Text style={{
                        ...defaultStyles.text,
                        fontSize: 20
                    }}>Change name:</Text>
                    <TextInput
                        value={value}
                        onChangeText={newName => setValue(newName)}
                        style={{
                            backgroundColor: "white",
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            marginVertical: 15,
                            borderRadius: 5,
                        }}
                        onSubmitEditing={editAndClose}
                    />
                    <Pressable 
                        onPress={editAndClose}
                        style={{
                            ...defaultStyles.primaryContainer,
                            padding: 10,
                            textAlign: "center",
                            alignItems: "center",
                            borderRadius: 5,
                        }}
                    >
                        <Text style={{
                            ...defaultStyles.text,
                            fontWeight: "bold"
                        }}>OK</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    )
}

export default ChangeNameModal