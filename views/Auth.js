import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Context from '../contextAPI/context';
import { Parse } from "parse/react-native";

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
        if(email.length === 0 || password.length === 0){
            window.alert("Username or password cannot be blank");
        }
        else {
            try {
                await Parse.User.logIn(email.toString(), password.toString());

                // get the current logged in objectId
                const objectId = await Parse.User.current().id;

                //query the cloud to get the name the person is assigned
                const user = Parse.Object.extend("User");
                const query = new Parse.Query(user);
                const name = await query.get(objectId);
                const usersName = name.get('name');

                const userData ={
                    name: usersName,
                    email: email,
                    password: password,
                    UID: objectId
                }

                //update the users info and go to the home screen
                this.context.updateUserData(userData)
                this.props.navigation.replace('HomeStack', {screen: 'Home'})
            }
            catch (error){
                window.alert("LoginError: " + error.message)
            }
        }
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
