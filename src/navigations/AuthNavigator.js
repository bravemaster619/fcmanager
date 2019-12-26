import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ResetPwdScene from '../scenes/ResetPwdScene';
import LoginScene from '../scenes/LoginScene';
import SignUpScene from '../scenes/SignUpScene';

import  MenuNavigator from './MenuNavigator';
import ResetPwdFinal from '../scenes/ResetPwdFinal';

const AuthNavigator = createStackNavigator({

    Login: LoginScene,
    Signup: SignUpScene,
    ResetPwd: ResetPwdScene,
    ResetPwdFinal: ResetPwdFinal,
    
    Home: {
        screen: MenuNavigator,
        navigationOptions: {
            header: null
        }
    },
    }
)

export default createAppContainer(AuthNavigator)