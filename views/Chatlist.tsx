import React from "react";
import { StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import FloatingActionButton from "../components/FloatingActionButton";
import { defaultStyles } from "../styles/styles";

const styles = StyleSheet.create({
    maincontainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: 1,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    listitem: {
        backgroundColor: "rgba(100, 100, 100, 0.5)",
        width: "100%",
        borderTopColor: "white",
        borderTopWidth: 1,
        padding: 20,
    },
    firstListitem: {
        borderTopWidth: 0,
    }
  });

function onPress(chat: String) {
    
}

const Chatlist = () => {
    return (
        <View style={{
            ...styles.maincontainer,
            ...defaultStyles.container,
        }}>

            <View>
                <Text style={{...defaultStyles.header, ...defaultStyles.text}}>Chats</Text>
            </View>

            <FlatList
                data={[
                    {key: 'Simon'},
                    {key: 'Jens'},
                ]}
                renderItem={(item) => <ChatItem name={item.item.key} onPress={() => onPress(item.item.key)} isFirstItem={item.index == 0}/>}
            />
            <FloatingActionButton icon="qrcode"/>

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