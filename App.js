import MainStack from './Stack/MainStack'
import GlobalState from './contextAPI/globalState'
import React, {useEffect} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import keys from './parse/Parse';
import Parse from "parse/react-native.js";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default function App() {

    useEffect(() => {
        const createInstallation = async () => {
            const Installation = Parse.Object.extend(Parse.Installation);
            const installation = new Installation();

            installation.set("deviceType", Platform.OS);

            await installation.save();
        }

        createInstallation();
    }, []);

    return (
        <GlobalState>
            <MainStack/>
        </GlobalState>
    );
}


