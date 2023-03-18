import React from "react";
import { StyleSheet, View, FlatList, Text, Pressable} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

function onPress(chat: String) {
    
}

const Chatlist = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    {key: 'Simon'},
                    {key: 'Jens'},
                ]}
                renderItem={({item}) => <Pressable onPress = {() => onPress(item.key)}><Text style={styles.item}>{item.key}</Text></Pressable>}
            />
        </View>
    );
};

export default Chatlist;