import React from 'react'
import { View } from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import Axios from 'axios'
import Styles  from '../styles/SignUpStyle'
import ServerAPIUri from '../api_url/ServerAPIUri';
import Qs from 'qs';

export default class SignUpScene extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            nickname: '',
            password: '',
            full_name: 'pine',
            pet_name: 'dog',
            role: 'student',
            confirmPassword: '',
            isNameValid: false,
            isPetValid: false,
            isPasswordValid: false,
            isConfirmValid: false,
            isWrong: false,
            isSuccessSignup: false
        };
    }

    validates = () => {

        let name = this.state.nickname;
        let pet_name = this.state.pet_name;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;

        let regName = /^[a-zA-Z]+$/
        
        
        if (name.trim() !== '') {
            this.setState({isNameValid: true});
        } else {
            this.setState({isNameValid: false});
        }
        if (pet_name.trim() !== '') {
            this.setState({isPetValid: true});
        }else {
            this.setState({isPetValid: false});
        }
        if (password.trim() != '') {
            this.setState({isPasswordValid: true});
        } else {
            this.setState({isPasswordValid: false});
        }

        if (confirmPassword === password) {
            this.setState({isConfirmValid: true});
        } else {
            this.setState({isConfirmValid: false});
        }

        this.setState({
            isWrong: !(this.state.isNameValid && this.isPetValid && this.state.isPasswordValid && this.state.isConfirmValid)
        })
        return !(this.state.isNameValid && this.isPetValid && this.state.isPasswordValid && this.state.isConfirmValid);
    }

    submit = () => {

        //this.validates();

        console.log("this.state.isWrong" + this.state.isWrong);
        console.log("this.state.isNameValid" + this.state.isNameValid);
        console.log("this.state.isPasswordValid" + this.state.isPasswordValid);
        console.log("this.state.isConfrimValid" + this.state.isConfirmValid);
        
        if (!this.validates()) {

            const { nickname } = this.state.nickname;
            const { password } = this.state.password;
    
            let signup = ServerAPIUri.signUpUri;
            Axios.post(signup, Qs.stringify({
                nickname: this.state.nickname,
                password: this.state.password,
                full_name: this.state.full_name,
                role: 'student'
                
            }))
            .then((response) => {
                if (response.data['success'] === true) {
                    console.log(response.data);
                    alert(response.data.data['reason']);
                    this.props.navigation.navigate('Login');
                } else {
                    console.log(response.data);
                    alert(response.data.data['reason']);
                }
            })
            .catch((error) => {
                console.log('error')
                console.log(error)
                
            })
        } else {
            alert("Please enter correct name and password");
        }
    }

    render(){
        return(
            <View style = { Styles.container}>
                <Text 
                h4
                style = { Styles.title}>
                    Sign Up
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
                    containerStyle = {{ marginBottom: 20 } }
                    placeholder = 'Please Enter your Name'
                    inputStyle = {Styles.inputID}
                    onChangeText = { (value) => {this.setState({
                        full_name: value})
                        this.setState({isWrong: false})}
                      }                  
                />
                <Input
                    containerStyle = {{ marginBottom: 20 } }
                    placeholder = 'Please Enter your favorite pet Name'
                    inputStyle = {Styles.inputID}
                    onChangeText = { (value) => {this.setState({
                        pet_name: value})
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
                <Input
                    placeholder = 'Please Confirm your Password'
                    secureTextEntry = {true}
                    inputStyle = {Styles.password}
                    onChangeText = { (value) => { this.setState({
                        confirmPassword: value});
                        this.setState({isWrong: false})}
                      }      
                />
                { this.state.isWrong && <Text style={Styles.error}>Wrong Input, Try again!</Text>}
                <Button
                    title ='SignUp'
                    buttonStyle = {{marginTop: 30}}
                    onPress = {() => {
                        this.submit()
                    }}
                    containerStyle = {{
                        marginTop: 20,
                        width: '95%'
                    }}
                />
                <Button
                        title='Back to Log in'
                        type='clear'
                        onPress={() => this.props.navigation.navigate('Login')}
                        containerStyle={{
                            marginTop: 10,
                            marginBottom: 30,
                        }}
                />    
            </View>
        );
    }
}