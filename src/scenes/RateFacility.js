import React from 'react'
import { View} from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import Styles  from '../styles/LoginStyle'

export default class RateFacility extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            userID: '',
            userPassword: ''
        }
    }
    static navigationOptions = {
        //headerTitle: () => <Text>Logout</Text>,
        headerRight: () => (
            <Button
                onPress={() => alert('This is a button!')}
                title="LogOut"
                color="#fff"
                style = { { marginRight: 20}}
            />
        )
    };
    render(){
        return(
            <View style = { Styles.container}>
                <Text 
                h4
                style = { Styles.title}>
                    RateFacility
                </Text>
            </View>
        );
    }
}