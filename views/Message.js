import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import MessageScroll from '../components/MessageDisplay/MessageScroll'

class Message extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            chatID: this.props.route.params.roomID,
        }
    }


    render() {
    return (
        <View style={styles.container}>
            <MessageScroll chatID={this.state.chatID}></MessageScroll>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    text: {
      fontSize: 50,
      color: 'blue'
    }
  });;

export default Message;