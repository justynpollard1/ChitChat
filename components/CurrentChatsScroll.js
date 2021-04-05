import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView} from 'react-native';
import Context from '../contextAPI/context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatRoomCard from './ChatRoomCard';
import {Parse} from "parse/react-native";

class CurrentChatsScroll extends React.Component {
    static contextType = Context
    constructor(props) {
        super(props)
        this.state = {
            roomData: []
        }
    }

    componentDidMount() {
        this.chatObserver();
    }

    componentWillUnmount() {
        this.unsub();
    }

    getSingleUserChatRooms = async() => {
        this.setState({roomData: []})



        //get the collection
        // const roomRef = db.collection('indivualChats')
        // get the current logged in objectId
        const userID = await Parse.User.current().id;

        //query the cloud and get the array of all ChatRooms the user has
        const query = new Parse.Query(Parse.Object.extend("User"));
        const name = await query.get(userID);
        const arrayChatRoomIDs = name.get('ChatRooms');



        // const roomSnapshots = roomRef.where('userIDs', "array-contains", this.context.userData.uid)
        const roomSnapshots = "";
        await roomSnapshots.get().then( async (snapshot) => {
            snapshot.forEach(async (room) => {

                // const roomData = room.data()
                // const otherUserID = (roomData.userIDs.filter(uid => uid !== this.context.userData.uid))[0]

                // const name = (await db.collection('users').doc(otherUserID).get()).data().name


                const oldData = this.state.roomData

                const newData = {
                    roomID: room.id,
                    otherUserName: name
                }

                if (roomData.messages[0] !== undefined){
                    newData.lastMsg = roomData.messages[0].msg
                }

                oldData.push(newData)

                this.setState({roomData: oldData})
            })
        })
    }

    chatObserver = () => {
        //get all the chatrooms that have my userID in them
        // const query = db.collection('indivualChats').where('userIDs', "array-contains", this.context.userData.uid)
        // this.unsub = query.onSnapshot(() => {
        //         this.getSingleUserChatRooms()
        // })
        this.getSingleUserChatRooms();
    }


    render() {
        return (
            <ScrollView>
                <View>
                    {this.state.roomData.map((info) => (
                        <ChatRoomCard
                        navigation={this.props.navigation}
                        roomID={info.roomID}
                        otherUserName={info.otherUserName}
                        lastMsg={info.lastMsg}/>
                    ))}
                </View>
            </ScrollView>
        )
    }
}

export default CurrentChatsScroll
