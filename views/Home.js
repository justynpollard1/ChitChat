import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../contextAPI/context';
import CurrentChatScroll from '../components/CurrentChatsScroll'
import { SearchBar } from 'react-native-elements';

class Home extends React.Component {
  static contextType = Context
  constructor(props){
    super(props)
    this.state={
      searchBarShow: false,
      search: ''
    }
  }

  componentDidMount() {
    if (this.state.searchBarShow == false)this.setLayout();
    else this.onSearchButtonClicked()
  }
  componentDidUpdate() {
    if (this.state.searchBarShow == false)this.setLayout();
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
            onCancel={this.onCancelPressed}
            value={search}
          />
    )
  }

  render() {
  return (
    <View style={styles.container}>
        <CurrentChatScroll navigation={this.props.navigation}/>
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
    }
  });;

  export default Home;