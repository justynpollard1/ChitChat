import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MessageScroll from '../components/MessageDisplay/MessageScroll'
import {auth, db} from "../firebase/Fire";
import {TextInput} from "react-native-gesture-handler";

class Message extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            chatID: this.props.route.params.roomID,
            message: ''
        }
    }

    sendMessage = async e => {
        e.preventDefault();
        let date = new Date();

        // create a new message document
        // todo: update time stamp to SERVER TIME, couldn't get it working, moved on instead
        const res = await db.collection('messages').add({
            msg: this.state.message,
            timeSent: date.getDate()+ "/"+date.getMonth() + "/" + date.getFullYear(),
            uid: auth.currentUser.uid
        });

        const res2 = await db.collection('indivualChats').doc(this.state.chatID).update({
            messages: db.FieldValue.arrayUnion({
                mid: res.id,
                msg: this.state.message,
                timeSent: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                uid: auth.currentUser.uid})
        });
        window.alert("completed 2");

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
