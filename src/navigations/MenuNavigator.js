import React from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/MaterialIcons';

import  BookingScene from  '../scenes/BookingScene';
import  BookingHistoryScene  from '../scenes/BookingHistoryScene';
import  menu from '../../assets/drawer.png';
import  Profile  from '../scenes/Profile';
import  RateFacility  from '../scenes/RateFacility';
import Announcement from '../scenes/Announcement';
import AnnounceScene from '../scenes/AnnounceScene';
import OutstandingScene from  '../scenes/OutstandingScene';
import CurrentBooking from '../scenes/CurrentBooking';

class NavigationDrawerStructure extends React.Component {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
      //Props to open/close the drawer
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <Image
              source={menu}
              style={{ width: 25, height: 25, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  
  const FirstActivity_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    First: {
      screen: BookingScene,
      navigationOptions: ({ navigation }) => ({
        title: 'BookingScene',
        headerRight: 
          <Button
              onPress={() => {
                AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys))
                .then(() => navigation.navigate('Login'))
              }}
              title="LogOut"
              color="grey"
              style = { { marginRight: 20}}
          />
        ,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        
        headerStyle: {
          backgroundColor: '#2389DD',
        },
        headerTintColor: '#fff',
      }),
    },
  });
   
  const Screen2_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: BookingHistoryScene, 
      navigationOptions: ({ navigation }) => ({
        title: 'BookingHistory',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: 
          <Button
              onPress={() => {
                AsyncStorage.multiRemove([nickname,password],()=>{
                  navigation.navigate('Login')
                })
              }}
              title="LogOut"
              color="grey"
              style = { { marginRight: 20}}
          />
        ,
        headerStyle: {
          backgroundColor: '#2389DD',
        },
        headerTintColor: '#fff',
      }),
    },
  });
   
  const Screen3_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    Third: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: 
          <Button
              onPress={() => {
                AsyncStorage.multiRemove(['nickname','password'],()=>{
                  navigation.navigate('Login')
                })
              }}
              title="LogOut"
              color="grey"
              style = { { marginRight: 20}}
          />
        ,
        headerStyle: {
          backgroundColor: '#2389DD',
          
        },
        headerTintColor: '#fff',
      }),
    },
  });

  const Screen4_StackNavigator = createStackNavigator({
    Fourth: {
      screen: AnnounceScene,
      navigationOptions: ({ navigation }) => ({
        title: 'Announcement',
        headerLeft: <NavigationDrawerStructure navigationProps = { navigation } />,
        headerRight: 
          <Button
            onPress = {() => {
              AsyncStorage.multiRemove(['nickname','password'], ()=>{
                  navigation.navigate('Login')
              })
            }}
            title = "LogOut"
            color = "grey"
            style = { { marginRight: 20}}
            />,
      headerStyle: {
        backgroundColor: '#2389DD'
      },
        headerTintColor: '#fff'
      })
    }
  })
  const Screen5_StackNavigator = createStackNavigator({
    Fifth: {
      screen: OutstandingScene,
      navigationOptions: ({ navigation }) => ({
        title: 'OutstandingList',
        headerLeft: <NavigationDrawerStructure navigationProps = { navigation } />,
        headerRight: 
          <Button
            onPress = {() => {
              AsyncStorage.multiRemove(['nickname','password'], ()=>{
                  navigation.navigate('Login')
              })
            }}
            title = "LogOut"
            color = "grey"
            style = { { marginRight: 20}}
            />,
      headerStyle: {
        backgroundColor: '#2389DD'
      },
        headerTintColor: '#fff'
      })
    }
  })
  const Screen6_StackNavigator = createStackNavigator({
    Sixth: {
      screen: CurrentBooking,
      navigationOptions: ({ navigation }) => ({
        title: 'BookingEdit',
        headerLeft: <NavigationDrawerStructure navigationProps = { navigation } />,
        headerRight: 
          <Button
            onPress = {() => {
              AsyncStorage.multiRemove(['nickname','password'], ()=>{
                  navigation.navigate('Login')
              })
            }}
            title = "LogOut"
            color = "grey"
            style = { { marginRight: 20}}
            />,
      headerStyle: {
        backgroundColor: '#2389DD'
      },
        headerTintColor: '#fff'
      })
    }
  })
const MenuNavigator = createDrawerNavigator({
    Booking: {
        screen: FirstActivity_StackNavigator,
       
        navigationOptions: {
            drawerLabel: 'Booking',
            drawerIcon: ({ focused, tintColor }) => {
                return (
                    <Ionicons 
                        name="access-time" 
                        size={25} 
                        color={tintColor} 
                    />
                )
            }
        },
    },
    BookingHistory: {
        screen: Screen2_StackNavigator,
        navigationOptions: {
        drawerLabel: 'BookingHistory',
        drawerIcon: ({ focused, tintColor }) => {
            return (
                <Ionicons 
                    name="done-all" 
                    size={25} 
                    color={tintColor} 
                />
            )
            }
        },
    },
    Profile: {
        screen: Screen3_StackNavigator,
        navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({ focused, tintColor }) => {
            return (
                <Ionicons 
                    name="perm-identity" 
                    size={25} 
                    color={tintColor} 
                />
            )
        }
            },
    },
    Announcement: {
      screen: Screen4_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Announcement',
        drawerIcon: ({focused, tintColor}) =>{
            return (
              <Ionicons
                name = "alarm"
                size = {25}
                color = {tintColor}
              />
            )
        }
      }
    },
    Outstanding: {
      screen: Screen5_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Outstanding',
        drawerIcon: ({focused, tintColor}) =>{
            return (
              <Ionicons
                name = "credit-card"
                size = {25}
                color = {tintColor}
              />
            )
        }
      }
    },
    CurrentBooking: {
      screen: Screen6_StackNavigator,
      navigationOptions: {
        drawerLabel: 'BookingEdit',
        drawerIcon: ({focused, tintColor}) =>{
            return (
              <Ionicons
                name = "credit-card"
                size = {25}
                color = {tintColor}
              />
            )
        }
      }
    }
});

export default createAppContainer(MenuNavigator);