import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements';

import  Icon  from 'react-native-vector-icons/FontAwesome';
import  ServerAPIUri  from '../api_url/ServerAPIUri';
import Qs from 'qs';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            nickname: '',
            full_name: '',
            password: '',
            confirmpassword: '',
            role: 'student'
        }
    }
    // static navigationOptions = {
    //     //headerTitle: () => <Text>Logout</Text>,

    // };
    async componentDidMount () {

        try {
            this.getProfile();
        } catch (e) {
            console.log(e)
        }
    }

    getStorageData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            console.log(key)
            console.log(value)
            this.setState({
                key: value
            })
            //console.log(this.state.nickname)
        } catch (e) {
            console.log(e)
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
        let full_name = this.state.full_name;

        let password = this.state.password;
        let confirmpassword = this.state.confirmpassword;

        if(this.isEmpty(name) || this.isEmpty(full_name)){
            return false;
        }


        let regName = /^[a-zA-Z]+$/    
        
        let isNameValid = name.trim() !== '' && regName.test(name)

        let isConfirmValid = password.trim() == confirmpassword.trim()

        this.setState({
            isWrong: !(isNameValid && isConfirmValid)
        })
        console.log("isNameValid && isConfirmValid" + isNameValid+isConfirmValid);
        return isNameValid && isConfirmValid;

    }
    ChangeProfile = () => {
        
        let url = ServerAPIUri.profileUpdate;
        console.log(this.state.nickname+" :nickname");
        if (this.validates()){
            Axios.post(url, Qs.stringify({

                new_nickname: this.state.nickname,
                new_full_name: this.state.full_name,
                new_password: this.state.password,
     
             })).then((response) => {
                 console.log("ProfileUpdate: "+response.data);
                 if (response.data['success'] === true) {
                     console.log(response.data);
                     //console.log(this.state.nickname + '---' + this.state.password );
                     //this.storeData();
                     alert('Profile Change Successful!');
                 } 
                 else {
                     alert(response.data.data['reason']);
                 }
             }).catch((error) => {
                 console.log('ProfileUpdateError' + error);
             })
        } else {
            alert("Wrong Input, Try again!");
        }
    }
    
    getProfile = () => {

        let url = ServerAPIUri.getProfile;

        this.getStorageData('nickname');
        this.getStorageData('password');

        console.log("nickname+profile"+this.state.nickname);

        Axios.post(url, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password

        })).then((response)=>{
            console.log(response.data)
            this.setState({nickname: response.data.data['profile']['nickname'], 
                           full_name: response.data.data['profile']['full_name']
                        });
        }).catch((error)=>{
            console.log(error);
        })
    }   
    render() {
        return (
            <>
                <StatusBar
                    
                />
                <ScrollView
                    style={{
                        marginHorizontal: 20
                    }}
                >
                    <View style={Styles.container}>
                        <Text
                            h4
                            style={Styles.title}>
                            Profile
                        </Text>
                        <View style={Styles.userID}>
                            <Input
                                label = "UserID"
                                value={this.state.nickname}
                                leftIcon = {<Icon name = 'user' size = {24} color='black'/>}
                                onChangeText={(value) => {
                                    this.setState({ nickname: value })
                                }}
                            />
                        </View>
                        <View style={Styles.name}>
                            <Input 
                                style = {{ width: '90%' }}
                                value = {this.state.full_name}
                                label = "Your Name"
                                leftIcon = {<Icon name = 'users' size = {24} color='black'/>}
                                onChangeText={(value) => {
                                    this.setState({ full_name: value })
                                }}
                            />
                        </View>
                        <View style={Styles.password}>
                            <Input
                                secureTextEntry
                                label = "Your Password"
                                placeholder= "Enter your new password"
                                value={this.state.password}
                                leftIcon = {<Icon name = 'key' size = {24} color='black'/>}
                                onChangeText={(value) => {
                                    this.setState({ password: value })
                                }}
                            />
                        </View>
                        <View style={Styles.password}>
                            <Input
                                secureTextEntry
                                label = "Confirm Password"
                                placeholder = "Confirm your password"
                                value={this.state.confirmpassword}
                                leftIcon = {<Icon name = 'key' size = {24} color='black'/>}
                                onChangeText={(value) => {
                                    this.setState({ confirmpassword: value })
                                }}
                            />
                        </View>
                        <View style={Styles.role}>
                            <Input
                                label = "Your Role"
                                editable={false}
                                leftIcon = {<Icon name = 'user' size = {24} color='black'/>}
                                value="student"
                            />
                        </View>
                        <Button
                            title="Change"
                            buttonStyle={{
                                marginVertical: 30
                            }}
                            onPress = {
                                () => {
                                    this.ChangeProfile()}}
                        >
                        </Button>
                    </View>
                </ScrollView>
            </>
        );
    }
}

const Styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 20
    },
    userID: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 40,
        width: '98%'
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '98%'
    },
    password: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '98%'
    },
    role: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '98%'
    }
})