import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../views/Auth';
import Signup from '../views/Signup';

const authStack = createStackNavigator();

function AuthStack() {
  <authStack.Navigator>
      <authStack.Screen name="Auth" component={Auth}/>
      <authStack.Screen updateUserStatus = {this.updateUserStatus} name="Signup" component={Signup}/> 
  </authStack.Navigator>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthStack;