import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from "react-native-gesture-handler";
import Context from "../contextAPI/context";
import {db} from "../firebase/Fire";
import {SearchBar} from "react-native-elements";
import CurrentChatScroll from "../components/CurrentChatsScroll";
import UserSearchScroll from "../components/userSearch/UserSearchScroll";
import GroupChatScroll from "../components/userSearch/GroupChatScroll";

class AddPersonToChat extends React.Component{
    static contextType = Context
    constructor(props) {
        super(props)
        this.state={
            searchBarShow: false,
            search: '',
            usersFound: []
        }
    }




    //gets search text and looks for users in db
    searchForUser = async() => {
        const usersFoundArray = []
        var strSearch = this.state.search;
        var strlength = strSearch.length;
        var strFrontCode = strSearch.slice(0, strlength-1);
        var strEndCode = strSearch.slice(strlength-1, strSearch.length);

        var startcode = strSearch;
        var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        const query = await db.collection('users')
            .where('name', '>=', startcode)
            .where('name', '<', endcode).get();
        query.forEach(user => {
            usersFoundArray.push([user.data().name, user.data().UID])

        })
        await new Promise(resolve => this.setState({usersFound: usersFoundArray}, () => resolve()))
    }


    //updates search bar text and search state
    updateSearch = search => {
        this.setState({ search });
    };

    //hides search bar and sets search to empty
    onCancelPressed = () => {
        this.setState({searchBarShow: false, search: ''})
    }

    //Search bar render
    userSearchBar() {
        const {search} = this.state;
        return (
            <SearchBar
                platform="ios"
                placeholder="Search for User"
                onChangeText={this.updateSearch}
                onSubmitEditing={this.searchForUser}
                onCancel={this.onCancelPressed}
                value={search}
                autoCapitalize='none'
            />
        )
    }

    render() {
        return(
        <View style={styles.container}>

            {/* display the search bar */}
            {this.userSearchBar()}

            <GroupChatScroll navigation={this.props.navigation} usersFound={this.state.usersFound}/>
        </View>
        )



    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 50,
        color: 'blue'
    },
    input: {
        bottom: 0,
        fontSize: 50,
        color: 'blue'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        borderWidth: 5
    }
});

export default AddPersonToChat;
