import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Text, Button, ListItem } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
//import Styles  from '../styles/LoginStyle'
import Qs from 'qs';
import Axios from 'axios';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ServerAPIUri from '../api_url/ServerAPIUri';
import AsyncStorage from '@react-native-community/async-storage';
import Announcement from '../scenes/Announcement';

class AnnounceScene extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            announceList: [{
                id: 1,
                subject: 'sifwe',
                content: 'jofew'
            }]
        }
    }
    static navigationOptions = {
        header: null
    };
    // static navigationOptions = {
    //     //headerTitle: () => <Text>Logout</Text>,
    //     header: null
    // };

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

    componentDidMount () {
        try {
            console.log("componentDidMount");
            this.getAnnounceList();
        } catch (e) {
            console.log(e)
        }
    }

    getAnnounceList = async () => {
        
        // await this.getStorageData('nickname');
        // await this.getStorageData('password');
        const v = await AsyncStorage.getItem('nickname');
        this.state.nickname = v;
        const w = await AsyncStorage.getItem('password');
        this.state.password = w;

        let url = ServerAPIUri.announceList;
        
        console.log("nickname : " + this.state.nickname);
        console.log("password : " + this.state.password);

        Axios.post(url, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password

        })).then((response) => {
            
            console.log(response.data.data['announce_list']);

            this.setState({announceList: response.data.data['announce_list']});


        }).catch((err) => {

            console.log(err)

        })
    }
    onPress = ()=>{
        console.log("clicked");
    }
    renderItem = ({item}) => (
        <View
            style = {{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                borderBottomWidth: 0.9,
                borderBottomColor: 'lightgray',
                paddingVertical: 8,
                paddingHorizontal: 8,
                alignItems: 'center'
            }}>
            <TouchableOpacity width="100%">
                <View style={{marginBottom: 10,                  
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'white'}}
                    onTouchStart={() => {this.props.navigation.navigate('AnnounceDetail', {announceId: item.id})}}>
                    <Text
                        style = {{color: 'black',
                                    width: '30%',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'red'}}>
                        {item.subject}
                    </Text>            
                    <Text
                        style = {{color: 'black', 
                                width: '50%',
                                fontSize: 15,
                                color: 'blue'}}>
                        {item.content}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <View style = { Styles.container}>
                <Text 
                h4
                style = { Styles.title}>
                    Announcement List
                </Text>
                <FlatList 
                    style = { {width: '100%'}}
                    keyExtractor = {(item,index) => index.toString()}
                    data = {this.state.announceList}
                    renderItem = {this.renderItem}>
                </FlatList>
            </View>
        
        );
    }
    
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    title: {
        marginTop: 20,
        marginBottom: 30,
        justifyContent: "center"
    }
})
const AppNavigator = createStackNavigator({
    Announce: AnnounceScene,
    AnnounceDetail: Announcement    
})

export default createAppContainer(AppNavigator)