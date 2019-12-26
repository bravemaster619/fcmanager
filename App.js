/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginScene from './src/scenes/LoginScene';
import ResetPwdScene from './src/scenes/ResetPwdScene';
import AuthScene from './src/scenes/AuthScene'
//import  AuthNavigator  from './src/navigations/AuthNavigator';
//import  MenuNavigator from './src/navigations/MenuNavigator';

class App extends React.Component {

  constructor(props) {

      super(props)
  }

  render() {
      return (
          <AuthScene />
          // <CameraScreen />
      )
  }
}

export default App
