import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

import context, {UserDataContext} from '../contextAPI/context';
import { Parse } from "parse/react-native";

class Signup extends React.Component {
    static contextType = context
    state = {
        name: '',
        email: '',
        password: ''
    }
    constructor(navigation){
        super(navigation)
    }

    handleSignUp = async () => {
        const {name, email, password } = this.state
        if (name.trim() === "" || email.trim() === "" || password.trim() === "" ){
            window.alert("Fields are not properly filled in");
        }
        else{
            try{
                //make sure we are starting fresh
                Parse.User.logOut();

                //create a new user, setting the fields
                let user = new Parse.User();
                user.set("name", name);
                user.set("username", email);
                user.set("email", email);
                user.set("password", password);
                //save the new user in teh cloud
                const result = await user.signUp();

                await AsyncStorage.setItem('sessionToken', result.getSessionToken());
                await AsyncStorage.setItem('username', result.getUsername());
            }
            catch{
                window.alert("oops, something when wrong with the signup")
            }
        }
        //add the uid to the assigned user
        let userId = await Parse.User.current().id;
        let User = Parse.Object.extend('User');
        let query = new Parse.Query(User);
        await query.get(userId).then(user => {
            user.set('uid', userId);
            user.save();
        })

        // save the new users data for the rest of the program
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            UID: userId
        }

        //update and switch to the home screen
        this.context.updateUserData(data)
        this.props.navigation.replace('HomeStack', {screen: 'Home'})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text} >Signup Screen</Text>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder='Full Name'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 50,
        color: 'blue'
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
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Signup
