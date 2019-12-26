import React from 'react'
import { View } from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import Styles  from '../styles/ResetPwdStyle'
import Qs from 'qs'
import Axios  from 'axios'
import ServerAPIUri from '../api_url/ServerAPIUri';

export default class ResetPwdScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            nickname:'',
        }
    }

    sendNextScene = () => {

        console.log('submit step');

        let nickname = this.state.nickname;

        if (nickname.trim() != '') {
            this.props.navigation.navigate("ResetPwdFinal", {nickname: this.state.nickname});
        }else {
            alert("Enter your ID");
        }
    }

    render() {
        return(
            <View
                style = { Styles.container }
            >
                <Text 
                    h4
                    style={{
                        marginBottom: 20
                    }}
                >
                    You Forgot Password?
                </Text>
                <Text
                    h5
                    style={{
                        textAlign: 'center',
                        marginBottom: 30
                    }}
                >
                   Please Enter Student ID to get Password. 
                </Text>
                <Input
                    label='StudentID'
                    placeholder='Please Enter Your ID'
                   
                    leftIcon={{ name: 'lock', color: 'grey' }}
                    containerStyle={{
                        marginBottom: 20,
                    }}
                    inputStyle={{
                        padding: 0
                    }}
                    leftIconContainerStyle={{
                        marginLeft: 0,
                        marginRight: 10
                    }}                  
                    onChangeText = { (value) => this.setState({nickname: value})}
                />
                
                <Button
                    title='Confirm'
                    onPress={() => this.sendNextScene()}
                    containerStyle={{
                        marginBottom: 60,
                        width: '80%'
                    }}
                />
            </View>
        )
    }

}
