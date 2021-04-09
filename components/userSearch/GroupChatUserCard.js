import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../contextAPI/context';
import {Parse} from "parse/react-native";



export default class GroupChatUserCard extends React.Component {
    static contextType = Context
    constructor(props){
        super(props);
        this.state={
            userCardData: [],
            roomID: this.props.roomID,
            uid: ''
        }
    }
    onAddUserPressed = async() => {
        let userClickedOnID = this.props.uid;
        let currentChatRoomID = this.state.roomID;
        let userAlreadyJoined = false;

        //get the users ChatRooms, and add the current one
        const userQuery = new Parse.Query(Parse.Object.extend("User"));
        const userQueryResult = await userQuery.get(userClickedOnID);
        const chatRoomObjID = userQueryResult.get('UserChatRoom').id

        //add get the chatroom
        const userRoomQuery = new Parse.Query(Parse.Object.extend("UserChatRoom"));
        await userRoomQuery.get(chatRoomObjID).then(room => {
            let userChatRoomArray = room.get("ChatRooms");
            if(userChatRoomArray === undefined) userChatRoomArray = [];

            //check to see if user is in the chatroom
            console.log(userChatRoomArray);
            console.log(userChatRoomArray.includes(userClickedOnID));
            userChatRoomArray.map( x => {
                if(x === currentChatRoomID) {
                    userAlreadyJoined = true
                    window.alert("User is already Part of this ChatRoom")
                }
            })

            //add user if they were not found
            if(!userAlreadyJoined){
                userChatRoomArray.push(currentChatRoomID);
                room.set('ChatRooms', userChatRoomArray);
                room.save();
                }
            })

        //update the users in the chatroom
        if(!userAlreadyJoined){
            //update the members of the chatroom, and the new one we clicked on
            const chatRoomQuery = new Parse.Query(Parse.Object.extend("ChatRooms"));
            await chatRoomQuery.get(currentChatRoomID).then(room =>{
                let usersArray = room.get('users');
                if(usersArray === undefined) usersArray = [];

                usersArray.push(userClickedOnID);
                room.set('users', usersArray);
                room.save();
            })
        }

        //add the room to the users messagesRooms
        this.props.navigation.navigate('Message', {roomID: this.state.roomID})
    };




    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.onAddUserPressed()}>
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
