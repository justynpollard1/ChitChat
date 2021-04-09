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


        //get the users ChatRooms, and add the current one
        const userQuery = new Parse.Query(Parse.Object.extend("User"));
        let userQueryResult = await userQuery.get(currentUserID);
        let chatRoomObjID = userQueryResult.get('UserChatRoom').id

        //add get the chatroom
        let userRoomQuery = new Parse.Query(Parse.Object.extend("UserChatRoom"));
        await userRoomQuery.get(chatRoomObjID).then( userRooms => {
            let chatRoomArray = userRooms.get('ChatRooms');
            //create an array if it doesn't exist
            if(chatRoomArray === undefined){
                chatRoomArray = []
            }
            chatRoomArray.push(chatRoomID);
            userRooms.set('ChatRooms', chatRoomArray);
            userRooms.save();
        })


        //save the new chatroom to the other user
        userQueryResult = await userQuery.get(userClickedOnID);
        chatRoomObjID = userQueryResult.get('UserChatRoom').id

        await userRoomQuery.get(chatRoomObjID).then( userRooms => {
            let chatRoomArray = userRooms.get('ChatRooms');
            //create an array if it doesn't exist
            if(chatRoomArray === undefined){
                chatRoomArray = []
            }
            chatRoomArray.push(chatRoomID);
            userRooms.set('ChatRooms', chatRoomArray);
            userRooms.save();
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
