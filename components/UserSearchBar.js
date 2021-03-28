import React from 'react';
import {Text, View} from 'react-native';
import {db} from '../firebase/Fire'
import { SearchBar } from 'react-native-elements';

export default class UserSearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state={
            search: ''
        }
    }

    updateSearch = search => {         
        this.setState({ search });
      };

    
      
    render(){
        const { search } = this.state;
        return(
            <SearchBar
            round
            searchIcon={{ size: 24 }}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        )
    }
}