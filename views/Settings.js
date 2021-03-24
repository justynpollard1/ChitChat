import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Settings({navigation}) {
  return (
    <View style={styles.container}>
          <Text style={styles.text} >Settings</Text>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    text: {
      fontSize: 50,
      color: 'blue'
    }
  });;

  export default Settings;