import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
