import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import MessageScroll from '../components/MessageDisplay/MessageScroll'
import {TextInput} from "react-native-gesture-handler";
import {Parse} from "parse/react-native";
import win from "react-native-web/dist/exports/Dimensions";

class Message extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            chatID: this.props.route.params.roomID,
            message: ''
        }
    }

    sendMessage = async e => {
        e.preventDefault();
        let currentUserID = await Parse.User.current().id;

        // add message to the db
        const Messages = Parse.Object.extend("messages");
        const messages = new Messages();
        messages.set('uid', currentUserID);
        messages.set('msg', this.state.message);
        const result = await messages.save();
        const messageID = result.id;


        //get the timestamp from the created message
        const query = new Parse.Query(Messages);
        const queryResult = await query.get(messageID);
        const timestamp = queryResult.get('createdAt');

        //create message to send to chat
        const newMessage = {
            mid: messageID,
            msg: this.state.message,
            timeSent: timestamp,
            uid: currentUserID
        }

        //query the cloud, add the message and save it
        const chatRoomQuery = new Parse.Query(Parse.Object.extend("ChatRooms"));
        await chatRoomQuery.get(this.state.chatID).then( room => {
            let messageArray = room.get('messages');
            if(messageArray === undefined){
                messageArray = [];
            }
            messageArray.push(newMessage);
            room.set('messages', messageArray);
            room.save();
        })

        //reset the state
        this.setState({
            message: '',
        })
        this.props.navigation.navigate('Message', {roomID: this.state.roomID})
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

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddPersonToChat', {roomID: this.state.chatID})}>
                    <Text style={styles.buttonText}>Add Person To Chat</Text>
                </TouchableOpacity>
                <Text>Messages</Text>

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
