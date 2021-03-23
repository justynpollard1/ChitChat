import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Auth({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <Button onPress={() => navigation.navigate('Home')} title="Settings"/>
      )
    })
  })
  return (
    <View style={styles.container}>
          <Text style={styles.text} >Login Screen</Text>
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

  export default Auth;