import React from 'react';
import Context from './context';


export default class GlobalState extends React.Component{
    state = {
        userData: {
        name: '',
        email: '',
        password: '',
        UID: ''}
    }

    updateUserData = (data) => {
        this.setState({userData: data})
    }

    render() {
        return(
            <Context.Provider
            value={{
                userData: this.state.userData,
                updateUserData: this.updateUserData
            }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }

}