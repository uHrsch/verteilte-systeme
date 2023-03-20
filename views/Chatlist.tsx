import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import FloatingActionButton from "../components/FloatingActionButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { useStorageContext } from "../contexts/StorageContext";
import { defaultStyles } from "../styles/styles";
import { RootStackParamList } from "./RootStackParams";

const styles = StyleSheet.create({
    maincontainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: 1,
        paddingTop: 10,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    listitem: {
        backgroundColor: "#434749",
        width: "100%",
        borderTopColor: "white",
        borderTopWidth: 1,
        padding: 20,
    },
    firstListitem: {
        borderTopWidth: 0,
    }
  });

type chatListProp = NativeStackNavigationProp<RootStackParamList, 'Chats'>;

const Chatlist = () => {

    const [chats, setChats] = useState<{id: string, name: string}[] | null>(null)
    const navigation = useNavigation<chatListProp>();
    const { getConversationIds, getName } = useStorageContext()
    
    const onPress = (id: string) => {
        navigation.navigate("Chat", {id: id})
    }

    useFocusEffect(
        useCallback(() => {loadChats()}, [])
    )

    const loadChats = async () => {
        const ids = await getConversationIds()
        const namesPromise = ids.map(id => getName(id))
        const names = await Promise.all(namesPromise)

        const data = ids.map((id, index) => ({
            id,
            name: names[index]
        }))
        setChats(data)
    }

    return (
        <View style={{
            ...styles.maincontainer,
            ...defaultStyles.container,
        }}>
            {
                chats === null ? (
                    <LoadingSpinner/>
                ) : (
                    chats.length > 0 ? (
                        <FlatList
                            data={chats}
                            renderItem={(item) => <ChatItem key={item.index} name={item.item.name} onPress={() => onPress(item.item.id)} isFirstItem={item.index == 0}/>}
                        />
                    ) : (
                        <Text style={[defaultStyles.text, {
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: "bold",
                            padding: 20,
                        }]}>
                            Click the button in the lower right corner to get started!
                        </Text>
                    )
                    
                )
            }
            <FloatingActionButton 
                icon="qrcode"
                onPress={() => navigation.navigate("Connect")}/>

        </View>
    );
};

function ChatItem({name, onPress, isFirstItem}: {name: string, onPress?: () => void, isFirstItem: boolean}) {
    return (
        <Pressable onPress = {onPress}>
            <View style={{
                ...styles.listitem,
                ...(isFirstItem ? styles.firstListitem : {}),
            }}>
                <Text style={{
                    ...defaultStyles.text,
                    ...styles.item,
                }}>
                    {name}
                </Text>
            </View>
        </Pressable>
    )
}

export default Chatlist;