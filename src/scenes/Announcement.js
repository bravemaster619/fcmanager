import React from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import Qs from 'qs'
import Axios  from 'axios'
import ServerAPIUri from '../api_url/ServerAPIUri';
import AsyncStorage from '@react-native-community/async-storage';

export default class Announcement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announceDetail:[{
                subject: 'No Announce',
                img_url: '',
                content: '',
                created_at: ''
            }]
        }
    }
    static navigationOptions = {
        header : null
    };

    componentDidMount () {
        try {
            console.log("componentDidMount------");            
            let announceId = this.props.navigation.state.params.announceId;
            this.getAnnounceDetail(announceId);
        } catch (e) {
            console.log(e)
        }

    }
    getAnnounceDetail = async (id) => {
        
        const nickname = await AsyncStorage.getItem("nickname");
        const password = await AsyncStorage.getItem("password");
        
        this.setState({nickname: nickname, password: password});

        console.log(id);

        let url = ServerAPIUri.getAnnounceDetail + "/" + id;        
        
        Axios.post(url, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password

        })).then((response) => {

            if(response.data['success']){

                console.log('success');
                this.setState({announceDetail: response.data.data['announce_detail']});
            }            
        }).catch((err) => {

            console.log("df " +err)

        })
    }
    
    render(){
        return(
            <ScrollView
                    style={{
                        marginHorizontal: 20
                    }}
                >
                    <View style={Styles.contain}>
                        <Text
                            h4
                            style={Styles.title}>
                            {this.state.announceDetail.subject}
                        </Text>
                        <Text
                            style = { Styles.content }>
                            {this.state.announceDetail.content}
                        </Text>
                        <View style={Styles.image}>
                            <Image
                                style={Styles.image}
                                source={{uri: this.state.announceDetail.img_url}}
                                
                            />
                        </View>          
                    </View>
            </ScrollView>
        )
    }
}

const navigationOptions={
    header: null
}
const Styles = StyleSheet.create({

    contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 20,
        backgroundColor: 'grey',
        padding: 20
    },
    title: {
        color: 'red',
        marginBottom: 30
    },
    content: {
        fontSize: 15,
        marginBottom: 30
    },
    image: {
        width: 300, 
        height: 300
    }
})