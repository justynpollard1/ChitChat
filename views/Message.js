import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MessageScroll from '../components/MessageDisplay/MessageScroll'
import {TextInput} from "react-native-gesture-handler";
import { Dimensions } from 'react-native';
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

    componentDidMount = () => {
        this.setLayout()
    }

    removeMeFromChat= async () => {
        const currentUserId = await Parse.User.current().id;
        // window.alert("current user " + currentUserId + "current room " + this.state.chatID);
        //remove the current chatroom from my profile
        const userQuery = new Parse.Query(Parse.Object.extend("User"));
        let userQueryResult = await userQuery.get(currentUserId);
        let chatRoomObjID = userQueryResult.get('UserChatRoom').id
        let userRoomQuery = new Parse.Query(Parse.Object.extend("UserChatRoom"));
        let chatRoomRemoved = [];
        await userRoomQuery.get(chatRoomObjID).then( userRooms => {
            let chatRoomArray = userRooms.get('ChatRooms');
            //create an array if it doesn't exist
            if(chatRoomArray !== undefined){
                chatRoomArray.map(roomID => {
                    if (roomID !== this.state.chatID){
                        chatRoomRemoved.push(roomID);
                    }
                })
                userRooms.set('ChatRooms', chatRoomRemoved);
                userRooms.save();
            }
        })
        // window.alert("removed from mine");
        //remove the current chatroom from the chatroom users
        const roomQuery = new Parse.Query(Parse.Object.extend("ChatRooms"));
        await roomQuery.get(this.state.chatID).then(chatroom => {
            let userArray = chatroom.get('users');
            let updatedUsers = [];
            if(userArray !== undefined){
                userArray.map(id => {
                    if(id !== currentUserId){
                        updatedUsers.push(id);
                    }
                })
                chatroom.set('users', updatedUsers);
                chatroom.save();
            }
        })

        window.alert("you have removed yourself from the chatroom");
        this.props.navigation.replace('HomeStack', {screen: 'Home'});
    }

    setLayout = () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.buttonAddPreson} onPress={() => this.props.navigation.navigate('AddPersonToChat', {roomID: this.state.chatID})}>
                        <View style={styles.buttonAddPerson}>
                            <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../assets/addPersonIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAddPreson} onPress={() => this.removeMeFromChat()}>
                        <View style={styles.buttonAddPerson}>
                            <Image style={{width: 30, height: 30, tintColor: 'white'}} source={require('../assets/removeIcon.webp')}/>
                        </View>
                    </TouchableOpacity>
                </View>
          )
        })
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
