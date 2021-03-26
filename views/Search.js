import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import {auth, db} from "../firebase/Fire";

class Search extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            chatID: "g84iVN3pgrI0czGiTtAA"
        }
    }


    render() {
        return (
            <View style={styles.container}>
               <textarea> Message </textarea>
            </View>
        );
    }
}
