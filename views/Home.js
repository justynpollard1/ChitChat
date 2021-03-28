import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../contextAPI/context';
import CurrentChatScroll from '../components/CurrentChatsScroll'
import UserSearchBar from '../components/UserSearchBar';

class Home extends React.Component {
  static contextType = Context
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.setLayout();
  }
  componentDidUpdate() {
    this.setLayout();
  }

  setLayout() {
      this.props.navigation.setOptions({
        headerRight: () => (
        <Button onPress={() => this.props.navigation.navigate('Settings')} title="Settings"/>
        )
      })
    
  }

  render() {
  return (
    <View style={styles.container}>
        <Text style={styles.text} >{this.context.userData.password}</Text>
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