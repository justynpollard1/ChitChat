import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Button, Alert, ScrollView} from 'react-native';
import {db} from '../../firebase/Fire'
import MessageCard from './MessageCard'


export default class MessageScroll extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            chatID: this.props.chatID,
            messages: []
        }
    }

    componentDidMount() {
        this.messageObserver();
    }

    componentWillUnmount(){
        this.unsub();
    }

    getMessages = async (chatID) => {
        const messagesRef = await db.collection('indivualChats').doc(chatID).get()
        const messagesDoc = messagesRef.data().messages
        const messageArray = []
        for (var i = 0; i < messagesDoc.length; i++) {
            const messageInfo = {
                sender: (await db.collection('users').doc(messagesDoc[i].uid).get()).data().name,
                msg: messagesDoc[i].msg,
                senderID: messagesDoc[i].uid,
                timeSent: messagesDoc[i].timeSent
            }
            messageArray.push(messageInfo)
          }
        this.setState({messages: messageArray})
    }

    messageObserver = () => {
        const messagesRef = db.collection('indivualChats').doc(this.state.chatID)
        this.unsub = messagesRef.onSnapshot(() => {
            this.getMessages(this.state.chatID)
        })
    }

    render(){
        return (
            <ScrollView contentContainerStyle={styles.mainViewContainer}>
                <View>
                    {this.state.messages.map((message) => (
                        <MessageCard
                        sender={message.sender}
                        message={message.msg}
                        senderID={message.senderID}
                        /*still not perfect, says 1970*/
                        timeSent={(new Date(message.timeSent.seconds)).toUTCString()}/>
                    ))}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainViewContainer: {
        justifyContent: 'flex-end',
        flexGrow: 1,
        backgroundColor: '#F3F3F3',
    }
});



