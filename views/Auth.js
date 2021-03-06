import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {auth, db} from '../firebase/Fire';
import Context from '../contextAPI/context';

class Auth extends React.Component {
  state ={
    email: '',
    password: '',
  }

  constructor(navigation) {
    super(navigation)
  }

  handleLogin = async () => {
    const {email, password} = this.state
    const response = await auth.signInWithEmailAndPassword(email, password)
    const userData = await db.collection('users').doc(response.user.uid).get()
    this.context.updateUserData(userData.data())
    this.props.navigation.replace('HomeStack', {screen: 'Home'})
  }

  static contextType = Context;
  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.text} >Login Screen</Text>
            <TextInput
              style={styles.inputBox} 
              value={this.state.email}
              onChangeText={email => this.setState({email})}
              placeholder='Email'
              autoCapitalize='none'
            />
            <TextInput
              style={styles.inputBox} 
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              placeholder='Password'
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button title="signup" onPress={() => this.props.navigation.navigate('Signup')}/>
      </View>
      );
  }
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
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    inputBox: {
      width: '85%',
      margin: 10,
      padding: 15,
      fontSize: 16,
      borderColor: '#d3d3d3',
      borderBottomWidth: 1,
      textAlign: 'center'
    },
    buttonSign: {
      fontSize: 12
    }
  });;

  export default Auth;