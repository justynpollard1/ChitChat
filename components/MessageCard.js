import React  from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


class MessageCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.side_stripe}></View>
                <View style={styles.text}><Text style={styles.senderText}>{this.props.sender}</Text></View>
                <View style={styles.text}><Text style={styles.body_text}>{this.props.message}</Text></View>
                <View style={styles.text}><Text style={styles.timeSent_text}>{this.props.timeSent}</Text></View>
                <View style={styles.side_stripe}></View>
                <View ></View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 10,
        backgroundColor: '#FFFFFF',
        width: '95%',
        height: 100,
        shadowColor: 'rgba(207, 207, 207, 0.15)',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8
    },
    text: {
        margin: 5,
        marginLeft: 12,
        flexDirection: 'column'
    },
    body_text: {
        marginRight: 50,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 13,
        lineHeight: 13,
        color: '#676767'
    },
    timeSent_text: {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 14,
        color: '#676767'
    },
    senderText: {
        marginTop: 2,
        fontWeight: "bold",
        color: "#66BEFD",
        fontSize: 10
    },
    side_stripe: {
        position: "absolute",
        backgroundColor: '#66BEFD',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        width: 5,
        height: 100,
      }
  });

  export default MessageCard;