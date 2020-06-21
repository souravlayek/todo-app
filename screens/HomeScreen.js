import React, {useState, useEffect} from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  AsyncStorage,

} from "react-native";
import MyButton from "../components/MyButton";
import ListItem from '../components/ListItem'

import moment from "moment";
import { Ionicons } from '@expo/vector-icons';



const HomeScreen = () => {
    const [item, setItem] = useState('')
    const [todolist, setTodolist] = useState([])
    const fetchData = async () => {
        try {
            const value = await AsyncStorage.getItem('data');
            if (value !== null) {
              // We have data!!
              const data = JSON.parse(value)
              setTodolist(data)
            }
          } catch (error) {
            // Error retrieving data
            console.log(error)
          }
    }
   
    const storeData = async () => {
        try {
            await AsyncStorage.removeItem('data')
          await AsyncStorage.setItem(
            'data',
            JSON.stringify(todolist)
          );
        } catch (error) {
          // Error saving data
          console.log('error')
        }
      };
    useEffect(() =>{
        fetchData()
    }, [])
    useEffect(() => {
        storeData(todolist)
    }, [todolist])

    const submitHandler = () => {
        if(item.length === 0){
            Alert.alert("Sorry!!!", "Please Type something before proceed",[{text: "okey"}])
            return
        }
        setTodolist(prev => [...prev, {id: moment().format('h:mm:ss a'), task: item, isComplete: false}])
        setItem('')
    }
    const date = moment().format('dddd MMM D')
    const selectHandler = (id) => {
        const newList = todolist.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                isComplete: !item.isComplete,
              };
       
              return updatedItem;
            }
       
            return item;
          });
          setTodolist(newList);
    }
    const deleteHandler = (id) => {
        const newList = todolist.filter((item) => item.id !== id);
        setTodolist(newList);
        
    }
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={styles.imagebgWraper}>
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={styles.imagebg}
      >
          <Text style={styles.dateText}>{date}</Text>
      </ImageBackground>
      </View>
      {todolist.length === 0 ? <View style={styles.noitem}>
          <Text style={styles.noitemText}>No Task Left As a task to accomplish</Text>
      </View>
      :<View style={styles.todolist}>
        <FlatList data={todolist} 
            keyExtractor={item => item.id} 
            renderItem={(itemData)=>(<ListItem item={itemData.item} 
                                                onClick={(id)=>selectHandler(id)}
                                                onDelete={(id)=>deleteHandler(id)} />)} />
      
      </View>}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Add Your Task" onChangeText={(e)=>setItem(e)} value={item} />
        <MyButton onclick={submitHandler}>
            <Ionicons name="ios-add" size={24} color="black" />
        </MyButton>
      </View>
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imagebgWraper: {
        height: "30%"
    },
    imagebg: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    dateText: {
        fontSize: 20,
        alignSelf: "flex-end",
        color: "white",
        padding: 5
    },
    todolist:{
        height: "60%"
        
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf:"flex-end"
    },
    
    
    input: {
        width: "75%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        fontSize: 18,
        padding: 5,
        paddingHorizontal: 10
    },
    noitem:{
        height: "60%",
        alignItems: "center",
        justifyContent: "center" ,
        padding: 30,
    },
    noitemText: {
        fontSize: 36,
        color: "#ccc",
        textAlign: "center"
    }
    
})

export default HomeScreen;
