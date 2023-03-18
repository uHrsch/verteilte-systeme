import React from "react";
import { StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center'
      },
    square: {
        width: '50%',
        aspectRatio: '1/1',
        backgroundColor: 'grey'
    },

});

const Camera = () => {
    return (
        <View style={styles.container}>
            <View style={styles.square}/>
            <Text>Scan QR Code</Text>
        </View>
    );
};

export default Camera;