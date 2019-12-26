import React from 'react'
import { View } from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import Styles  from '../styles/ResetPwdStyle'
import Qs from 'qs'
import Axios  from 'axios'
import ServerAPIUri from '../api_url/ServerAPIUri';


export default class ResetPwdFinal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            pet_name: ''
        }
    }


    resetPassword = () => {
        const { navigation } = this.props;

        let nickname = navigation.getParam('nickname');

        this.setState({nickname: nickname});
        let pet_name = this.state.pet_name;
        let url = ServerAPIUri.resetPassword;
        console.log("nickname : " + nickname + "--" + "pet_name :" + pet_name);
        if (nickname.trim()!=='' && pet_name.trim()!=='') {
            Axios.post(url, Qs.stringify({
                nickname: nickname,
                pet_name: pet_name
            })).then((response)=> {
                console.log(response.data); 
                if (response.data['success'] === true) {
                    
                    alert('Your password is '+ response.data.data['password']+ ' Please keep it!');
                    navigation.navigate('Login');
                } else {
                    alert(response.data.data['reason']);
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert('Enter your pet_name');
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
                    Get new password for you!
                </Text>
                <Text
                    h5
                    style={{
                        textAlign: 'center',
                        marginBottom: 30
                    }}
                >
                   Please Enter Your Favorite Pet Name to get Password. 
                </Text>
                <Input
                    label='Pet Name'
                    placeholder='Please Enter Your Pet Name'
                    
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
                    onChangeText = { (value) => this.setState({pet_name: value})}
                    
                />
                
                <Button
                    title='Confirm'
                    onPress={() => this.resetPassword()}
                    containerStyle={{
                        marginBottom: 60,
                        width: '80%'
                    }}
                />
            </View>
        )
    }
}