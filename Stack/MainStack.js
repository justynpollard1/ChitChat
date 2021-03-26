import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Settings from '../views/Settings';
import Auth from '../views/Auth';
import Signup from '../views/Signup';
import Message from '../views/Message';

const mainStack = createStackNavigator();
const homeStack = createStackNavigator();
const authStack = createStackNavigator();

function MainStack() {
    return (
      <NavigationContainer>
        <mainStack.Navigator initialRouteName="AuthStack" headerMode="none">
          <mainStack.Screen name="AuthStack" component={AuthStack}/>
          <mainStack.Screen name="HomeStack" component={HomeStack}/>
        </mainStack.Navigator>
      </NavigationContainer>
    )
  }

function HomeStack() {
  return (
  <homeStack.Navigator>
    <homeStack.Screen name="Home" component={Home} />
    <homeStack.Screen name="Settings" component={Settings}/>
    <homeStack.Screen name="Message" component={Message}/>
  </homeStack.Navigator>)
}

function AuthStack() {
  return(
  <authStack.Navigator>
      <authStack.Screen name="Auth" component={Auth}/>
      <authStack.Screen name="Signup" component={Signup}/> 
  </authStack.Navigator>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainStack;