import React from 'react';
import firebase from "firebase";
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MessageScroll from '../components/MessageDisplay/MessageScroll'
import {auth, db} from "../firebase/Fire";
import {TextInput} from "react-native-gesture-handler";
import { Dimensions } from 'react-native';

class Message extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            chatID: this.props.route.params.roomID,
            message: ''
        }
    }
    
    componentDidMount = () => {
        this.setLayout()
    }

    setLayout = () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.buttonAddPreson} onPress={() => this.props.navigation.navigate('AddPersonToChat', {roomID: this.state.chatID})}>
                    <View style={styles.buttonAddPerson}>
                        <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../assets/addPersonIcon.png')}/>
                    </View>
                </TouchableOpacity>
          )
        })
    }

    sendMessage = async e => {
        e.preventDefault();
        let date = firebase.firestore.Timestamp.now();

        // add message to the db
        const res = await db.collection('messages').add({
            msg: this.state.message,
            timeSent: date,
            uid: auth.currentUser.uid
        });
        const newMessage = {
            mid: res.id,
            msg: this.state.message,
            timeSent: date,
            uid: auth.currentUser.uid
        }

        let messageArr = [];
        //get the array of maps from db
        const ref = await db.collection('indivualChats').doc(this.state.chatID).get();
        const arr = ref.data().messages;
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
            <View style={styles.mainViewContainer}>
                <View style={styles.scrollContainer}>
                    <MessageScroll chatID={this.state.chatID}/>
                </View>
                
                <View style={styles.ioContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.message}
                        onChangeText={message => this.setState({message})}
                        placeholder='message to send'
                        autoCapitalize='none'
                    />

                    <TouchableOpacity onPress={this.sendMessage}>
                        <View style={styles.buttonSendMessage}>
                            <Image style={styles.imageStyle} source={require('../assets/SendIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: '#F3F3F3',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },  
    scrollContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*.74,

    },
    ioContainer: {
        marginTop: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: Dimensions.get('window').width*.95,
        height: Dimensions.get('window').height*.05,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
	        width: 3,
	        height: 15,
        },
        shadowRadius: 3.84,
        shadowOpacity: 0.1,
        elevation: 5,
    },
    input: {
        width: (Dimensions.get('window').width*.95)-45,
        bottom: 0,
        fontSize: 20,
        color: 'grey',
        height: Dimensions.get('window').height*.05,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonSendMessage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#66BEFD',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
	        width: 3,
	        height: 15,
        },
        shadowRadius: 3.84,
        shadowOpacity: 0.1,
        elevation: 5,
    },
    buttonAddPerson: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#66BEFD',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
	        width: 3,
	        height: 15,
        },
        shadowRadius: 3.84,
        shadowOpacity: 0.1,
        elevation: 5,
        marginLeft: 5
    },
    imageStyle: {
        width: 30,
        height: 30,
     }
});

export default Message;
