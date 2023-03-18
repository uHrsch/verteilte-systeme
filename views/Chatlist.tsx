import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import FloatingActionButton from "../components/FloatingActionButton";
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

    const navigation = useNavigation<chatListProp>();

    const onPress = (chat: string) => {
        navigation.navigate("Chat", {name: chat, id: ""}) //TODO
    }

    return (
        <View style={{
            ...styles.maincontainer,
            ...defaultStyles.container,
        }}>
            <FlatList
                data={[
                    {name: 'Simon'},
                    {name: 'Jens'},
                    {name: 'Simon'},
                    {name: 'Jens'},
                    {name: 'Simon'},
                    {name: 'Jens'},
                    {name: 'Simon'},
                    {name: 'Jens'},
                    {name: 'Simon'},
                    {name: 'Jens'},
                    {name: 'Simon'},
                    {name: 'Jens'},
                    {name: 'Simon'},
                    {name: 'Jens'},
                ]}
                renderItem={(item) => <ChatItem key={item.index} name={item.item.name} onPress={() => onPress(item.item.name)} isFirstItem={item.index == 0}/>}
            />
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