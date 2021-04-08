import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
import Context from '../../contextAPI/context';
import { db } from '../../firebase/Fire';



export default class UserCard extends React.Component {
    static contextType = Context

    onNewUserPressed = async() => {
        const data = {
            messages: [],
            userIDs: [this.context.userData.uid, this.props.uid]
        }
        
        const result = await db.collection('indivualChats').add(data)
        
        const selfRef = db.collection('users').doc(this.context.userData.uid)
        const selfData = (await selfRef.get()).data()
        if('messageRooms' in selfData) {
            const data = selfData.messageRooms
            data.push(result.id)
            await selfRef.update({messageRooms: data})
        } else {
            await selfRef.update({messageRooms: [result.id]})
        }

        const otherUserRef = db.collection('users').doc(this.props.uid)
        const otherUserData = (await otherUserRef.get()).data()
        if('messageRooms' in otherUserData){
            const data = otherUserData.messageRooms
            data.push(result.id)
            await otherUserRef.update({messageRooms: data})
        } else {
            await otherUserRef.update({messageRooms: [result.id]})
        }

        this.props.navigation.navigate('Message', {roomID: result.id})
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