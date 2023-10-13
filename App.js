import React, { useState } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, TextInput,StyleSheet } from 'react-native';

import { getAllContacts, addContact, deleteAllContact,deleteContact} from './Realm';
function Realm_App (){
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");
    const [contacts, setContacts] = useState(getAllContacts);
    const [counter, setCounter] = useState(contacts.length + 1);
    const saveName = (savedName) => {
        setName(savedName);
    }
    const saveNumber = (savedNumber) => {
        setNumber(savedNumber);
    }
    const renderItem = ({item}) => (
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>{item.recordID} </Text>
            <Text>{item.givenName} </Text>
            <Text>{item.phoneNumber}</Text>
            <Button title='Delete' onPress={() => {
            deleteContact(item.recordID); // Call your delete function here
            setContacts(getAllContacts()); // Update the contacts state
        }} />
        </View>
    );
    return(
        <SafeAreaView style={{padding: 3,alignItems:"center"}}>
            <View style={{margin:20,width:250}}>
                <Text>Name</Text><TextInput style={styles.txtbox} onChangeText={saveName}></TextInput>
                <Text>Contact Number</Text><TextInput style={styles.txtbox} onChangeText={saveNumber}></TextInput>
                <Button title="save contact"
                onPress={(()=>{
                    addContact(counter, name, number);
                    setContacts(getAllContacts);
                    setCounter(counter+1);
                })}/>
            </View>
            <View style={{marginBottom:20,width:250}}>
                <Button title="Delete all contacts"
                onPress={()=>{
                    deleteAllContact();
                    setContacts(getAllContacts);
                    setCounter(1);
                }}/>
            </View>
            <View style={{width : '80%'}}>
                <Text style={{marginTop:10,fontSize:25,fontWeight:'bold',textAlign:'center'}}>Contacts</Text>
                <FlatList
                data={contacts}
                keyExtractor={item => item.recordID}
                renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
}

export default Realm_App;
const styles=StyleSheet.create({
        
        txtbox : {
            borderColor : "#bbbbbb",
            borderWidth : 2,
            height : 40,
            width:"100%",
            marginTop : 10,
            marginBottom : 20

        }
    })

