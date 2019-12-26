import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Text, Button, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Qs from 'qs';
import Axios from 'axios';
import ServerAPIUri from '../api_url/ServerAPIUri';
import AsyncStorage from '@react-native-community/async-storage';

export default class OutStandingScene extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            outStandingList: [
                {
                    amount:'100$',
                    reason: 'Because of Cancelling'
                },
                {
                    amount: '21$',
                    reason: 'Not Attending'
                },
                {
                    amount: '25$',
                    reason: 'No coming'
                }
            ],
            nickname: '',
            password: ''
        }
    }

    // static navigationOptions = {
    //     //headerTitle: () => <Text>Logout</Text>,
    //     //header: null
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

    async componentDidMount () {

        try {
            this.getAllOutStanding();
        } catch (e) {
            console.log(e)
        }
    }

    getAllOutStanding = () => {
        
        this.getStorageData('nickname');
        this.getStorageData('password');

        let url = ServerAPIUri.outstandingList;
        
        Axios.post(url, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password

        })).then((response) => {

            console.log(response.data.data['outstanding_list'])

            this.setState({outStandingList: response.data.data['outstanding_list']});

        }).catch((err) => {

            console.log(err)

        })
    }
    renderItem = ({item}) => (
        <View
            style = {{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.9,
                borderBottomColor: 'lightgray',
                paddingVertical: 8,
                paddingHorizontal: 20,
                alignItems: 'center'
            }}>
            <Text
                //onPress={() => this.props.navigation.navigate('BookingDetail')}
               style = {{color: 'black'}}
            >
                {item.amount}
            </Text>
            <Text
                //onPress={() => this.props.navigation.navigate('BookingDetail')}
               style = {{color: 'black'}}
            >
                {item.reason}
            </Text>
            <Text
                //onPress={() => this.props.navigation.navigate('BookingDetail')}
               style = {{color: 'black'}}
            >
                {item.to}
            </Text>          
        </View>
    )

    render(){
        return(
            <View style = { Styles.container}>
                <Text 
                h4
                style = { Styles.title}>
                    Your Outstanding List
                </Text>
                <FlatList 
                    style = { {width: '100%'}}
                    keyExtractor = {(item,index) => index.toString()}
                    data = {this.state.outStandingList}
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