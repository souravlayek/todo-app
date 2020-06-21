import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Platform, View, StyleSheet } from 'react-native'

const MyButton = (props) => {
    const TouchableComp = Platform.OS === "android"? TouchableNativeFeedback : TouchableOpacity
    return (
        <View style={styles.wraper}>
        <TouchableComp onPress={props.onclick} >
            <View  style={ props.style,styles.container}>
                {props.children}
            </View>   
        </TouchableComp>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        paddingHorizontal: 13,
        backgroundColor: "#ccc",
        
    },
    wraper: {
        overflow: "hidden",
        borderRadius: 20
    }
})

export default MyButton;
