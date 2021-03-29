import React from 'react';
import { StyleSheet} from 'react-native';
import MainStack from './Stack/MainStack'
import GlobalState from './contextAPI/globalState'

export default class App extends React.Component {
  render(){
    return (
      <GlobalState>
        <MainStack/>
      </GlobalState>
  )}
}
