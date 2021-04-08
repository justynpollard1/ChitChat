import React  from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Image} from 'react-native';
import Context from '../../contextAPI/context';


class MessageCard extends React.Component {
    static contextType = Context
    constructor(props){
        super(props);
    }
    render() {
        if (this.props.senderID == this.context.userData.uid) {
            return (
                <View style={styles.containerSelf}>
                    <View style={styles.bubbleSelf}>
                            <View style={styles.text}><Text style={styles.body_text}>{this.props.message}</Text></View>
                            <View tyle={styles.text}><Text style={styles.timeSent_text}>{this.props.timeSent}</Text></View>
                    </View>
                </View>
            )
        }
         else {
            return (
                <View style={styles.containerOther}>
                    <View style={styles.text}><Text style={styles.senderText}>{this.props.sender}</Text></View>
                    <View style={styles.bubbleOther}>
                            <View style={styles.text}><Text style={styles.body_text}>{this.props.message}</Text></View>
                            <View tyle={styles.text}><Text style={styles.timeSent_text}>{this.props.timeSent}</Text></View>
                    </View>
                </View>
                )
            }
        }
    }


const styles = StyleSheet.create({
    containerSelf: {
        alignSelf: 'flex-end',
        marginVertical: 5
    },
    containerOther: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 5
    },
    bubbleSelf: {
        backgroundColor: 'rgb(102, 190, 253)',
        width: Dimensions.get('window').width*.70,
        height: Dimensions.get('window').height*.05,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
	        width: 0,
	        height: 15,
        },
        shadowRadius: 3.84,
        shadowOpacity: 0.1,
        elevation: 5,
    },
    bubbleOther: {
        backgroundColor: '#F7993A',
        width: Dimensions.get('window').width*0.70,
        height: Dimensions.get('window').height*.05,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowRadius: 3.84,
        shadowOpacity: 0.1,
        elevation: 5,
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
        fontSize: 12,
        lineHeight: 14,
        color: 'black',
        alignItems: 'center',
        display: 'flex'
    },
    time_sent_container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    timeSent_text: {
        
        fontWeight: 'normal',
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