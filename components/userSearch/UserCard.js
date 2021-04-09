import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../contextAPI/context';
import { Parse } from "parse/react-native";



export default class UserCard extends React.Component {
    static contextType = Context

    onNewUserPressed = async() => {
        let currentUserID = await Parse.User.current().id;
        let userClickedOnID = this.props.uid;

        //create new chatroom and save my userName + the clicked on persons username
        const ChatRoom = Parse.Object.extend("ChatRooms");
        const chatRoom = new ChatRoom();
        chatRoom.set('users', [currentUserID, userClickedOnID])
        const result = await chatRoom.save();
        const chatRoomID = result.id;



        const query = new Parse.Query( Parse.Object.extend("User"));

        //add ChatRoom ID to the current user
        await query.get(currentUserID).then(currentUser => {
            let chatRoomArray = currentUser.get('ChatRooms');
            //create an array if it doesn't exist
            if(chatRoomArray === undefined){
                chatRoomArray = []
            }
            chatRoomArray.push(chatRoomID);
            currentUser.set('ChatRooms', chatRoomArray);
            currentUser.save();
        })


        //add message room to the user Clicked on
        await query.get(userClickedOnID).then(otherUser => {
            console.log( userClickedOnID+ " " + otherUser.get('chatRooms') + " " + chatRoomID);
            let chatRoomArray2 = otherUser.get('ChatRooms');
            // create an array if it doesn't exist
            if(chatRoomArray2 === undefined){
                chatRoomArray2 = []
            }

            chatRoomArray2.push(chatRoomID);
            otherUser.set('ChatRooms', chatRoomArray2);
            otherUser.save();
            console.log(chatRoomArray2);
        })
        this.props.navigation.navigate('Message', {roomID: chatRoomID})
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.onNewUserPressed()}>
                    <View style={styles.container}>
                            <View style={styles.text}><Text style={styles.nameText}>{this.props.name}</Text></View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 30,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width,
        height: 100,
        margin: 10,
        borderBottomWidth: 0.5,
        borderColor: "#CFCFCF",
        borderStyle: "solid",
    },
    text: {
        height: 30,
        width: 200,
        flexDirection: 'column'
    },
    nameText: {
        fontWeight: "400",
        color: "black",
        fontSize: 20,
    }
})
