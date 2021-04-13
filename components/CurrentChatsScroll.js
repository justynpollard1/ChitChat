import React from 'react';
import {View, ScrollView} from 'react-native';
import Context from '../contextAPI/context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatRoomCard from './ChatRoomCard';
import {Parse} from "parse/react-native";

class CurrentChatsScroll extends React.Component {
    static contextType = Context
    constructor(props) {
        super(props)
        this.state = {
            roomData: [],
            queryClient: "",
            liveQuery: "",
        }
        let liveQueryClient = new Parse.LiveQueryClient({
            applicationId: 'kYSoaP9C7d9JujPHMbZ4AIhtBTmmDIevX42cMQG6',
            serverURL: 'wss://' + 'chitchat.b4a.io',
            javascriptKey: 'V1eJ6EjksQ6B95OJzOjTQBu0BNFjJIVw2YSkp9BS'
        });
        liveQueryClient.open();
        this.state.queryClient = liveQueryClient;
        this.state.liveQuery = new Parse.Query("ChatRooms");
    }


    componentDidMount() {
        this.getSingleUserChatRooms();
        this.chatObserver();
    }

    componentWillUnmount() {
        this.state.queryClient.unsubscribe(this.state.liveQuery);
        this.getSingleUserChatRooms();
    }

    getSingleUserChatRooms = async() => {
        //reset the variable
        this.setState({roomData: []})
        const oldData = this.state.roomData

        // get the current logged in objectId
        const currentUserID = await Parse.User.current().id;

        //query the cloud and get the array of all ChatRooms the user has
        const userQuery = new Parse.Query(Parse.Object.extend("User"));
        const userQueryResult = await userQuery.get(currentUserID);
        const chatRoomObjID = userQueryResult.get('UserChatRoom').id

        //get the room object associated with the user
        const userRoomQuery = new Parse.Query(Parse.Object.extend("UserChatRoom"));
        const userRoomQueryResult = await userRoomQuery.get(chatRoomObjID);
        const arrayChatRoomIDs = userRoomQueryResult.get('ChatRooms')

        //go through the array of chatroomIDs assigned to the user, get the other user from the chatroom who arent current user
        let arrayLength = arrayChatRoomIDs.length;
        for(let i=0; i < arrayLength; i++){
            let otherUsersNames = []
            let chatRoomQuery = new Parse.Query(Parse.Object.extend("ChatRooms"));
            let chatRoomQueryResult = await chatRoomQuery.get(arrayChatRoomIDs[i]);
            let userIdArray = chatRoomQueryResult.get('users').filter(uid => uid !== currentUserID);
            let messagesFromChatRoom = chatRoomQueryResult.get('messages');

            //create an array of names of the other users names
            let userIDArrayLength = userIdArray.length;
            for(let i=0;i < userIDArrayLength; i++){
                //only get the names that are defined
                if(userIdArray[i] !== undefined) {
                    let otherUserQueryResult = await userQuery.get(userIdArray[i]);
                    otherUsersNames.push(otherUserQueryResult.get('name'));
                }
            }

            if(otherUsersNames.length > 0){
                const newData = {
                    roomID: arrayChatRoomIDs[i],
                    otherUserName: otherUsersNames.toString(),
                }
                if(messagesFromChatRoom.length > 0) {
                    newData.lastMsg = messagesFromChatRoom[messagesFromChatRoom.length - 1].msg
                }
                oldData.push(newData)
            }

        }
        this.setState({roomData: oldData})
    }



    chatObserver = () => {
        let subscription = this.state.queryClient.subscribe(this.state.liveQuery);
        subscription.on('update', (object) =>{

            this.getSingleUserChatRooms();
        })
    }


    render() {
        return (
            <ScrollView>
                <View>
                    {this.state.roomData.map((info) => (
                        <ChatRoomCard
                            key={info.roomID}
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
