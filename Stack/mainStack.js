import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Settings from '../views/Settings';
import Auth from '../views/Auth';
import Signup from '../views/Signup';


const mainStack = createStackNavigator();

class MainStack extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userToken: null
    }
  }

  render() {
    return (
      <NavigationContainer>
        <mainStack.Navigator>
        {this.state.userToken != null ? (
          <>
          <mainStack.Screen name="Home" component={Home}/>
          <mainStack.Screen name="Settings" component={Settings}/>
          </>
        ) : (
          <>
          <mainStack.Screen name="Auth" component={Auth}/>
          <mainStack.Screen name="Signup" component={Signup}/> 
          </>
        )}
        </mainStack.Navigator>
      </NavigationContainer>
    )
  }
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