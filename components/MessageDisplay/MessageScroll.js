import React, { Component } from 'react';

import { StyleSheet, Text, View, Button, Alert, ScrollView} from 'react-native';
import MessageCard from './MessageCard'
import {Parse} from "parse/react-native";


export default class MessageScroll extends Component {
    constructor(props){
        super(props)
        this.state= {
            roomID: this.props.chatID,
            messages: []
        }
    }
    //
    componentDidMount() {
        this.messageObserver();
    }

    componentWillUnmount(){
        this.unsub();
    }

    getMessages = async (chatID) => {
        //get the messages from the chatroom we got called with
        const chatRoomQuery = new Parse.Query(Parse.Object.extend("ChatRooms"));
        const chatRoomQueryResult = await chatRoomQuery.get(chatID);
        const messages = chatRoomQueryResult.get('messages');

        // create our own array of objects from the response
        const messageArray = []
        for (let i = 0; i < messages.length; i++) {
            //query to get the users name from the cloud that sent the message
            const query = new Parse.Query(Parse.Object.extend("User"));
            const queryResult = await query.get(messages[i].uid);
            const name = queryResult.get('name');

            //create a new message to push to messageArray
            const messageInfo = {
                sender: name,
                msg: messages[i].msg,
                timeSent: messages[i].timeSent
            }
            messageArray.push(messageInfo)

          }

        this.setState({messages: messageArray})
    }

    /*Subscribe to the ChatRooms, it will ping on any chatroom being changed,
    haven't figured otu how to subscribe to a single object*/
    messageObserver = () => {
        let liveQueryClient = new Parse.LiveQueryClient({
            applicationId: 'kYSoaP9C7d9JujPHMbZ4AIhtBTmmDIevX42cMQG6',
            serverURL: 'wss://' + 'chitchat.b4a.io',
            javascriptKey: 'V1eJ6EjksQ6B95OJzOjTQBu0BNFjJIVw2YSkp9BS'
        });
        liveQueryClient.open();

        let query = new Parse.Query("ChatRooms");
        var subscription = liveQueryClient.subscribe(query);
        subscription.on('update', (object) =>{
            if(object.id === this.state.roomID){
                this.getMessages(this.state.roomID);
            }
        })
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
