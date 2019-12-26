import React from 'react'
import { View, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Input, Text, Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation'
import Qs from 'qs'
import Axios from 'axios'

import Styles  from '../styles/LoginStyle'
import ServerAPIUri from '../api_url/ServerAPIUri';


export default class LoginScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                nickname: '',
                password: '',
                confirmPassword: '',
                full_name: '',
                role: 'student',
                isWrong: false,
        };
        
    }
    static navigationOptions = {
        header: null
    };

    async componentDidMount () {
        try { 
            this.loginRedirect();
        } catch (e) {
            console.log(e)
        }
    }
    
    submit = () => {
            console.log('submit step');
            if (this.validates()) {

                let url = ServerAPIUri.loginUri;
                console.log("login nickname : " + this.state.nickname);
                console.log("nickname : " +this.state.nickname);
                console.log("password : " +this.state.password);
                Axios.post(url, Qs.stringify({
                    nickname: this.state.nickname,
                    password: this.state.password,
                    // full_name: this.state.full_name,
                    // role: 'student'
                }))
                .then((response) => {
                    
                    if (response.data['success'] === true) {
                        console.log(response.data);
                        //console.log(this.state.nickname + '---' + this.state.password );
                        this.storeData();

                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Home'})]
                        }))
                    } 
                    else {
                        alert(response.data.data['reason']);
                    }
                })
                .catch((error) => {
                    //console.log('error')
                    console.log(error + '57line')                   
                })
            } 
            // else {
            //     alert("Please Enter your ID and password");
            // }
    } 

    loginRedirect = async () => {

        pref_nickname = await AsyncStorage.getItem('nickname', "");
        pref_password = await AsyncStorage.getItem('password', "");
        
        console.log('83 pref_nickname: ' + pref_nickname); 
        console.log('83 pref_password: ' + pref_password);

        if (pref_nickname === null){
            // this.props.navigation.dispatch(StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'login'})]
            // }))
            this.props.navigation.navigate('login');
        } else if(pref_nickname !== '' && pref_password !== '')
        {
            this.setState({nickname: pref_nickname, password: pref_password})
            this.submit();
        }
        
    }

    isEmpty = (str) => {
        if(str === null || str === null || str === undefined || str === false){
            return true;
        }
        return false;
    }

    validates = () => {

        let name = this.state.nickname;
        let password = this.state.password;
        
        if(this.isEmpty(name) || this.isEmpty(password)){
            return false;
        }

        

        let regName = /^[a-zA-Z]+$/    
        
        let isNameValid = name.trim() !== ''
        let isConfirmValid = password.trim() !== ''

        this.setState({
            isWrong: !(isNameValid && isConfirmValid)
        })
        console.log("isNameValid && isConfirmValid" + isNameValid+isConfirmValid);
        return isNameValid && isConfirmValid;
        
    }

    storeData = async() => {
            try {
               let data_name = this.state.nickname;
                let data_password = this.state.password;
                await AsyncStorage.setItem('nickname', data_name)
                await AsyncStorage.setItem('password', data_password)

            } catch (error) {
                console.log("storing data failed!");
            }
    };

    render(){
        return(
            <View style = { Styles.container}>
                <Text 
                h4
                style = { Styles.title}>
                    Facility Manager
                </Text>
                <Input
                    containerStyle = {{ marginBottom: 20 } }
                    placeholder = 'Please Enter StudentID'
                    inputStyle = {Styles.inputID}

                    onChangeText = { (value) => {this.setState({
                        nickname: value})
                        this.setState({isWrong: false})}
                    }
                />
                
                <Input
                    placeholder = 'Please Enter your Password'
                    secureTextEntry = {true}
                    inputStyle = {Styles.password}
                    onChangeText = { (value) => {this.setState({
                        password: value})
                        this.setState({isWrong: false})}
                    }  
                />
                
                <Button
                    title ='Login'
                    buttonStyle = {{marginTop: 30}}
                    onPress = { () => this.submit()}
                    containerStyle = {{
                        marginTop: 20,
                        width: '95%'
                    }} 
                />
                { this.state.isWrong && <Text style={Styles.error}>Wrong Input, Try again!</Text>}
                <View style = {{
                    flex: 1,
                    width: '100%',
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    marginTop: 30
                }}>
                    <Button
                        title='Forgot Password?'
                        type='clear'
                        onPress={() => this.props.navigation.navigate('ResetPwd')}
                        containerStyle={{
                            marginTop: 10,
                            marginBottom: 30,
                        }}
                    />
                    <Button
                        title='Create account'
                        type='clear'
                        onPress={() => this.props.navigation.navigate('Signup')}
                        containerStyle={{
                            marginTop: 10,
                            marginBottom: 30,
                        }}
                    />
                </View>
                
            </View>
        );
    }
}