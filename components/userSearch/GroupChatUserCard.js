import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../contextAPI/context';




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
        // find better way to get the users ID we clicked on
        const users = db.collection('users');
        const snapshot = await users.where('name', '==', this.props.name).get();
        if(snapshot.empty) window.alert("userFound")
        snapshot.forEach(e => this.setState({
            uid: e.id,
        }))

        // update the users chatroom
        let messageRooms = []
        const arr = users.doc(this.state.uid).get()
        for (let i = 0; i < arr.length; i++){
            messageRooms.push(arr[i]);
        }
        messageRooms.push(this.state.roomID);

        await users.doc(this.state.uid).update({
            messageRooms: messageRooms
        });



        // update the chatroom members
        let idArray = [];
        //get the array of maps from db
        const ref = await db.collection('indivualChats').doc(this.state.roomID).get();
        const arr2 = ref.data().userIDs;
        for (let i = 0; i < arr2.length; i++){
            idArray.push(arr2[i]);
        }
        idArray.push(this.state.uid);


        //push array of maps back to db
        await db.collection('indivualChats').doc(this.state.roomID).update({
            userIDs: idArray
        });
        this.setState({
            uid: '',
        })



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
