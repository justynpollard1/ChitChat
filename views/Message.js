import React, { useState } from 'react';
import {StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import MessageScroll from '../components/MessageScroll'
import {auth, db} from "../firebase/Fire";
import {TextInput} from "react-native-gesture-handler";

class Message extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            chatID: "g84iVN3pgrI0czGiTtAA",
            message: ''
        }
    }

    sendMessage = e => {
        e.preventDefault();
        const { message, chatID } = this.state
        const data = {
            messages: {
                mID: "generate Message ID",
                msg: this.state.message,
                timeSent: new Date().getDate(),
                uid: "get user ID"
            }
        }
        //need to figure out how to push this data to the database
        db.collection("indivualChats").doc("g84iVN3pgrI0czGiTtAA").add(data);
        this.setState({
            message: '',
        })



    };

    render() {

    return (
        <View style={styles.container}>
            <MessageScroll chatID={this.state.chatID}/>

            <TextInput
                style={styles.input}
                value={this.state.message}
                onChangeText={message => this.setState({message})}
                placeholder='message to send'
                autoCapitalize='none'
            />

            <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    text: {
      fontSize: 50,
      color: 'blue'
    },
    input: {
        bottom: 0,
        fontSize: 50,
        color: 'blue'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        borderWidth: 5
    }
  });

export default Message;
