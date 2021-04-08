import React from 'react';
import {StyleSheet, View} from 'react-native';
import Context from "../contextAPI/context";
import {SearchBar} from "react-native-elements";
import GroupChatScroll from "../components/userSearch/GroupChatScroll";
import {Parse} from "parse/react-native";

class AddPersonToChat extends React.Component{
    static contextType = Context
    constructor(props) {
        super(props);
        this.state={
            searchBarShow: false,
            search: '',
            usersFound: [],
            roomID: this.props.route.params.roomID
        }
    }




//gets search text and looks for users in db
    searchForUser = async() => {
        const usersFoundArray = []
        const currentUserId = await Parse.User.current().id;
        //get all users from the cloud
        let allUserQuery = new Parse.Query(Parse.Object.extend("User"));
        let allUserQueryResult = await allUserQuery.find();

        //get all the users that match the search criteria
        allUserQueryResult.map(x => {
            if (x.get('name').includes(this.state.search) && x.get('uid') !== currentUserId) {
                usersFoundArray.push([x.get('name'), x.get('uid')])
            }
        });


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

            <GroupChatScroll navigation={this.props.navigation}
                             usersFound={this.state.usersFound}
                             roomID={this.state.roomID}/>
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
