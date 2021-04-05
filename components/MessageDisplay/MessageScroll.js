import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView} from 'react-native';
import MessageCard from './MessageCard'
import {Parse} from "parse/react-native";


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
        //uncomment when ready to query the cloud
        // const query = new Parse.Query(Parse.Object.extend("ChatRooms"));
        // const queryResult = await query.get(chatID);
        // const messages = queryResult.get('messages');

        //try using hard data before querying the cloud
        const messages = [
            {"mid":"sPKWcxAbFi","msg":"This is a test","timeSent":"time","uid":"wiODwjYCBK"},
            {"mid":"sPKWcxAbFi","msg":"This is a test","timeSent":"time","uid":"wiODwjYCBK"}
            ]

        const messageArray = []
        for (let i = 0; i < messages.length; i++) {

            //query to get the users name from the cloud
            const query = new Parse.Query(Parse.Object.extend("User"));
            const queryResult = await query.get(messages[i].uid);
            const name = queryResult.get('name');

            //create a new message to push to messageArray
            const messageInfo = {
                sender: name,
                msg: messages[i].msg,
                timeSent: messagesDoc[i].timeSent
            }
            messageArray.push(messageInfo)
          }
        //update
        this.setState({messages: messageArray})
    }

    messageObserver = () => {
        this.getMessages(this.state.chatID);
        // const messagesRef = db.collection('indivualChats').doc(this.state.chatID)
        // this.unsub = messagesRef.onSnapshot(() => {
        //     this.getMessages(this.state.chatID)
        // })
    }

    render(){
        return (
            <ScrollView>
                <View>
                    {this.state.messages.map((message) => (
                        <MessageCard
                        sender={message.sender}
                        message={message.msg}
                        /*still not perfect, says 1970*/
                        timeSent={(new Date(message.timeSent.seconds)).toUTCString()}/>
                    ))}
                </View>
            </ScrollView>
        )
    }
}
