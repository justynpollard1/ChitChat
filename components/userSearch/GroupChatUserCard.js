import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
import Context from '../../contextAPI/context';
import { db } from '../../firebase/Fire';



export default class GroupChatUserCard extends React.Component {
    static contextType = Context

    onAddUserPressed = async() => {
        window.alert("I want to add this person to the chat");
        window.alert(this.props.uid)// the user I want to add to the chatRoom
        // window.alert(this.props.route.params.roomID)//maybe the room I am in
    }

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
