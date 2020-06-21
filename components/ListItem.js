import React from 'react'
import { View, TouchableNativeFeedback, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MyButton from './MyButton';

const ListItem = (props) => {
    const TouchableComp = Platform.OS === "android"? TouchableNativeFeedback : TouchableOpacity
    return (
        <View style={styles.wraper}>
        <TouchableComp onPress={()=>props.onClick(props.item.id)} >
            <View style={ props.style,styles.container}>
                {
                    props.item.isComplete === true?<Text style={styles.completed}>{props.item.task}</Text> : 
                    <Text style={styles.incomplete}>{props.item.task}</Text>
                }
                <MyButton onclick={()=>props.onDelete(props.item.id)}>
                    <Ionicons name="md-trash" size={24} color="grey" />
                </MyButton>
            </View>   
        </TouchableComp>
        </View>
        
    );
}

const styles = StyleSheet.create({
    wraper:{
        overflow: "hidden",
        margin: 5,
    },
    container: {
        borderWidth:1,
        borderColor: "#888",
        borderRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        
    },
    incomplete: {
        fontSize: 18,
    },
    completed: {
        fontSize: 18,
        textDecorationLine: 'line-through'
    },
})

export default ListItem;
