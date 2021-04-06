import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Context from '../contextAPI/context';
import CurrentChatScroll from '../components/CurrentChatsScroll'
import { SearchBar } from 'react-native-elements';
import UserSearchScroll from '../components/userSearch/UserSearchScroll';
import { Parse } from "parse/react-native";

class Home extends React.Component {
    static contextType = Context
    constructor(props){
        super(props)
        this.state={
            searchBarShow: false,
            search: '',
            usersFound: []
        }
    }

    componentDidMount() {
        if (this.state.searchBarShow === false)this.setLayout();
        else this.onSearchButtonClicked()
    }
    componentDidUpdate() {
        if (this.state.searchBarShow === false)this.setLayout();
        else this.onSearchButtonClicked()
    }

    //sets header for when search is clicked
    onSearchButtonClicked = () => {
        this.props.navigation.setOptions({
            headerTitle: () => (
                this.userSearchBar()
            ),
            headerRight: () => (null)
        })
    }

    //sets normal layout of header
    setLayout() {
        this.props.navigation.setOptions({
            headerTitle: () => (
                <Button onPress={() => this.setState({searchBarShow: true})} title="Search"/>
            ),
            headerRight: () => (
                <Button onPress={() => this.props.navigation.navigate('Settings')} title="Settings"/>
            )
        })

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


        if (this.state.searchBarShow===false) {
            return (
                <View style={styles.container}>
                    <CurrentChatScroll navigation={this.props.navigation}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <UserSearchScroll navigation={this.props.navigation} usersFound={this.state.usersFound}/>
                </View>
            )
        }
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
    }
});;

export default Home;
