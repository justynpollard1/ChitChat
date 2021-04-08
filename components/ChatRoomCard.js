import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


class ChatRoomCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Message', {roomID: this.props.roomID, navigation: this.props.navigation})}>
                    <View style={styles.container}>
                            <View style={styles.text}><Text style={styles.nameText}>{this.props.otherUserName}</Text></View>
                            <View tyle={styles.text}><Text style={styles.lastMsgText}>{this.props.lastMsg}</Text></View>
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
    },
    lastMsgText: {
        color: 'grey'
    }

})

export default ChatRoomCard