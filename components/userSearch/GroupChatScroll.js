// import React from 'react';
// import {View, StyleSheet, ScrollView} from 'react-native';
// import GroupChatUserCard from "./GroupChatUserCard";
// import UserCard from "./UserCard";
//
//
//
// export default class GroupChatScroll extends React.Component {
//     constructor(props){
//         super(props);
//         this.state= {
//             userCardData: [],
//             roomID: this.props.roomID
//         }
//     }
//     componentDidUpdate(){
//         if (this.props.usersFound !== this.state.userCardData) this.setState({userCardData: this.props.usersFound})
//     }
//
//     render(){
//         return(
//             <ScrollView>
//                 <View>
//                     {this.state.userCardData.map((data) => (
//                         /*create the groupChat user Card*/
//                         <GroupChatUserCard
//                             navigation={this.props.navigation}
//                             name={data[0]}
//                             uid={data[1]}
//                             roomID ={this.state.roomID}
//                         />
//                     ))}
//                 </View>
//             </ScrollView>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: 'center',
//         backgroundColor: 'white',
//     },
//     text: {
//         fontSize: 50,
//         color: 'blue'
//     }
// });;
