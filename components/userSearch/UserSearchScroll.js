// import React from 'react';
// import {View, StyleSheet, ScrollView} from 'react-native';
// import UserCard from './UserCard';
//
//
//
// export default class UserSearchScroll extends React.Component {
//     constructor(props){
//         super(props)
//         this.state={
//             userCardData: []
//         }
//     }
//     componentDidUpdate(){
//         if (this.props.usersFound != this.state.userCardData) this.setState({userCardData: this.props.usersFound})
//     }
//
//     render(){
//         return(
//             <ScrollView>
//                 <View>
//                     {this.state.userCardData.map((data) => (
//                         <UserCard
//                         navigation={this.props.navigation}
//                         name={data[0]}
//                         uid={data[1]}/>
//                     ))}
//                 </View>
//             </ScrollView>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: 'center',
//       backgroundColor: 'white',
//     },
//     text: {
//       fontSize: 50,
//       color: 'blue'
//     }
//   });;
