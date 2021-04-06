import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import MessageScroll from '../components/MessageDisplay/MessageScroll'
import {TextInput} from "react-native-gesture-handler";
import {Parse} from "parse/react-native";

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
        // let date = new Date.now().toTimestamp();
        let currentUserID = await Parse.User.current().id;

        // const newMessageObject = {
        //     msg: this.state.message,
        //     timeSent: date,
        //     uid: currentUserID
        // }

        // add message to the db
        const Messages = Parse.Object.extend("messages");
        const messages = new Messages();
        messages.set('uid', currentUserID);
        messages.set('msg', this.state.message);
        const result = await messages.save();

        window.alert(result.id);
        // console.log(result.createdAt);


        const newMessage = {
            mid: res.id,
            msg: this.state.message,
            timeSent: date,
            uid: auth.currentUser.uid
        }

        let messageArr = [];
        //get the array of maps from db
        const ref = await db.collection('indivualChats').doc(this.state.chatID).get();
        const arr = ref.data().messageRooms;
        for (let i = 0; i < arr.length; i++){
            messageArr.push(arr[i]);
        }

        //add a new map
        messageArr.push(newMessage);
        //push array of maps back to db
        await db.collection('indivualChats').doc(this.state.chatID).update({
            messages: messageArr
        });
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
