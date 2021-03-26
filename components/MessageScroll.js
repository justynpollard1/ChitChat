import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView} from 'react-native';
import {db} from '../firebase/Fire'
import MessageCard from './MessageCard'


export default class MessageScroll extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            chatID: this.props.chatID,
            messages: []
        }
    }

    getMessages = async (chatID) => {
        const messagesRef = await db.collection('indivualChats').doc(chatID).get()
        const messagesDoc = messagesRef.data().messages
        const messageArray = [] 
        for (var i = 0; i < messagesDoc.length; i++) {
            const messageInfo = {
                sender: (await db.collection('users').doc(messagesDoc[i].uid).get()).data().name,
                msg: messagesDoc[i].msg,
                timeSent: messagesDoc[i].timeSent
            }
            messageArray.push(messageInfo)
          }
        this.setState({messages: messageArray})
    }
    render(){
        this.getMessages(this.state.chatID)
        return (
            <ScrollView>
                <View>
                    {this.state.messages.map((message) => (
                        <MessageCard 
                        sender={message.sender} 
                        message={message.msg} 
                        timeSent={"1pm"}/>
                    ))}
                </View>
            </ScrollView>
        )
    }
}