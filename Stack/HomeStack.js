import React from 'react';
import { StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Settings from '../views/Settings';

const homeStack = createStackNavigator();

function HomeStack() {
  <homeStack.Navigator>
    <homeStack.Screen name="Home" component={Home}/>
    <homeStack.Screen name="Settings" component={Settings}/>
  </homeStack.Navigator>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeStack;