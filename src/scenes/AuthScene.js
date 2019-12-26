import React from 'react'
import AuthNavigator from '../navigations/AuthNavigator'

class AuthScreen extends React.Component {

    constructor(props) {

        super(props)
    }

    static navigationOptions = {
        title: 'Auth',
    }

    render() {
        return (
            <AuthNavigator />
        )
    }
}

export default AuthScreen