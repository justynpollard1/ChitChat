import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {auth} from '../firebase/Fire'
import  {AuthStack} from './authStack';
import  {MainStack} from './mainStack'
import {AuthContext} from '../context/authProvider'


export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    return (
      <NavigationContainer>
        {user ? <MainStack/> : <AuthStack />}
      </NavigationContainer>
    );
  }