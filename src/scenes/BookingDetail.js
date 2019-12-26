import React from 'react'
import { View, Text, ListView, TouchableOpacity} from 'react-native'
import { Button, ListItem, Divider, Overlay } from 'react-native-elements'
import  BookingDetailStyle  from  '../styles/BookingDetailStyle';
import { FlatList } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import TimePicker from "react-native-24h-timepicker";

import moment from 'moment';
import ServerAPIUri from  '../api_url/ServerAPIUri';
import Qs from 'qs';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import BookingHistoryScene from '../scenes/BookingHistoryScene';

export default class BookingDetail extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            facilityDetailList: [
                {
                    from: '09:00',
                    to: '10:00'
                }, 
                {
                    from: '09:00',
                    to: '12:00'
                },{
                    from: '13:00',
                    to: '16:00'
                }
            ],
            fac_id:'',
            nickname: '',
            password: '',
            date: moment(),
            bookingdate: moment().format('YYYY-MM-DD'),
            bookingfrom: "-- : --",
            bookingto: "-- : --",
            isbookingDateAtSelected: false,
            isbookingFromAtSelected: false,
            isbookingToAtSelected: false,
            isVisibleTimePicker: false,
            timePickermode: true// date pick, false: time pick
        }
    }
    async componentDidMount () {
        const { navigation } = this.props;
        // this.getStorageData('nickname');
        // this.getStorageData('password');
        const value = await AsyncStorage.getItem("nickname");
        this.setState({nickname: value});
        const value1 = await AsyncStorage.getItem("password")
        this.setState({password: value1});

        try {
            this.getFacDetail(navigation.getParam('FacID'));
            // let nickname = navigation.getParam('nickname');
            // let password = navigation.getParam('password');
            console.log(nickname + "dfdf" + password);
            this.setState({nickname: nickname, password:password});
        } catch (e) {
            console.log("componentDidMount : " + e)
        }
    }
    
    getFacDetail = ( FacID )=> {
        this.setState({fac_id: FacID});
        let url = ServerAPIUri.getFreeTimeSlot+'/'+FacID;
        console.log(this.state.date.format('YYYY-MM-DD'));
        Axios.post(url, Qs.stringify({
            booking_date: this.state.date.format('YYYY-MM-DD')
        })).
        then((response) => {
            console.log(response.data);
            if(response.data.data.length == 0){
                alert("No available time");
                return;
            }
            this.setState({facilityDetailList: response.data.data});

        }).catch((err) => {

            console.log("getFacDetail : " +err)
        })
    }
    getFacDetailByDate = (FacID, date) => {

        this.setState({fac_id: FacID});
        let url = ServerAPIUri.getFreeTimeSlot+'/'+FacID;
        console.log(date.format('YYYY-MM-DD'));
        Axios.post(url, Qs.stringify({
            booking_date: date.format('YYYY-MM-DD')
        })).
        then((response) => {
            console.log(response.data);
            if(response.data.data.length == 0){
                alert("No available time");
                return;
            }
            this.setState({facilityDetailList: response.data.data});

        }).catch((err) => {

            console.log("getFacDetail : " +err)
        })

    }
    static navigationOptions = {
        header: null
    }
    onCancel = () => {
        //this.setState({isVisibleTimePicker: false});
        this.TimePicker.close();
    }  
    onConfirm(hour, minute) {
        if (this.state.isbookingFromAtSelected){
            this.setState({ bookingfrom: `${hour}:${minute}` });
        } 
        if (this.state.isbookingToAtSelected) {
            this.setState({ bookingto: `${hour}:${minute}` });
        }
        
    }
    onConfirmDate = (date) => {

        if (this.state.isbookingDateAtSelected) {
            this.setState({ bookingdate: date});
        }
    }
    getStorageData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            console.log("getStorageData" + value);
            this.setState({
                key: value
            })

        } catch (e) {
            console.log("getStorageData" + e);
        }
    }
    validates = () => {
        let date = this.state.bookingdate;
        let from = this.state.bookingfrom;
        let to = this.state.bookingto;

        if (date === '--' || from ==='-- : --' || to === '-- : --'){
            alert("Select Date and time!");
            return false;
        }
        return true;
    }
    onBook = () => {
        if (this.validates()) {
            console.log("onBook nickname : " + this.state.nickname);
            console.log("onBook password : " + this.state.password);

            let url = ServerAPIUri.bookingUri + "/" + this.state.fac_id;
            console.log("Time::" +this.state.bookingfrom);
            Axios.post(url, Qs.stringify({
                nickname: this.state.nickname,
                password: this.state.password,
                booking_date: this.state.bookingdate,
                from: this.state.bookingfrom,
                to: this.state.bookingto

            })).then((response) => {
                console.log(response.data);

                if (response.data['success'] === true) {
                    alert("Booking Success");
                    this.props.navigation.navigate('BookingEdit');
                }
                else {
                    alert(response.data.data['reason']);
                }

            }).catch((err) => {

                console.log("onBook : " + err)

            })
        }
        
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
                paddingHorizontal: 15,
                alignItems: 'center'
            }}>
            <Text
                style = {{color: 'black'}}
                >
                    {item.data}
            </Text>
            
            <Text
                //onPress={() => this.props.navigation.navigate('BookingDetail')}
               style = {{color: 'black'}}
            >
                {item.from}
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
            <View style={BookingDetailStyle.container}>
                <Text
                    style = {{fontSize: 20, fontWeight: 'bold'}}>
                    Please select time for booking!    
                </Text>
                <View style = {{
                     flex: 1,
                     alignItems: 'center',
                     justifyContent: 'center'
                }}>
                    <TouchableOpacity 
                        style = {{backgroundColor: 'grey', padding: 5}}
                        onPress={() => this.setState({isVisibleTimePicker: true, isbookingDateAtSelected: true, timePickermode: true})}>
                            <Text 
                                style = {{fontSize: 30, alignSelf: 'center'}}
                            >
                                {this.state.bookingdate}
                            </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <TouchableOpacity 
                        style={{
                            flex: 1,
                        }}
                        // onPress={() => {
                            
                        //     this.setState({ isVisibleTimePicker: true, isbookingFromAtSelected: true, timePickermode: false})
                        // }
                        // }
                            onPress={() => {
                                this.TimePicker.open()
                                this.setState({ isbookingFromAtSelected: true })
                            }
                        }
                    >
                        <Text 
                            style = {{fontSize: 30, alignSelf: 'center'}}
                        >
                            {this.state.bookingfrom}
                        </Text>
                    </TouchableOpacity>
                    <Text 
                        style = {{fontSize: 30, alignSelf: 'center'}}
                        >
                        -------
                    </Text>
                    <TouchableOpacity 
                        style={{
                            flex: 1,
                            
                        }}
                        // onPress={() => {
                        //     this.setState({ isVisibleTimePicker: true, isbookingToAtSelected: true,timePickermode: false})
                        //     }
                        // }
                        onPress={() => {
                            this.TimePicker.open()
                            this.setState({ isbookingToAtSelected: true })
                        }
                        }
                    >
                        <Text
                            style = {{fontSize: 30, alignSelf: 'center'}}>
                            {this.state.bookingto}
                        </Text>
                    </TouchableOpacity>
                    <TimePicker
                        ref = { ref => {
                            this.TimePicker = ref;
                        } }
                        onCancel={() => this.onCancel()}
                        onConfirm={(hour, minute) => {
                            this.onConfirm(hour, minute)
                            this.setState({ isbookingFromAtSelected: false, isbookingToAtSelected: false });
                            this.TimePicker.close();
                        }}
                        itemStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        style={{ alignSelf: 'center' }}
                    />     
                </View>       
                <Button 
                    title = 'Booking'
                    onPress = {()=> this.onBook()}
                    >             
                </Button>

                <Text 
                    style = {{fontSize: 25,fontWeight: 'bold',marginBottom: 20, marginTop: 20}}>
                    Available Booking Time
                </Text>

                <FlatList 
                    style = { {width: '100%'}}
                    keyExtractor = {(item,index) => index.toString()}
                    data = {this.state.facilityDetailList}
                    renderItem = {this.renderItem}>
                </FlatList>

                <Divider style={{ backgroundColor: 'blue' }} />
                
                <Overlay
                        isVisible={this.state.isVisibleTimePicker}
                        onBackdropPress={() => this.setState({
                            isVisibleTimePicker: false
                        })}
                        overlayStyle={{
                            width: 330,
                            height: 230
                        }}
                >
                        <View>
                            <DatePicker
                                date={this.state.date}                              
                                mode= 'date'
                                minimumDate = {new Date()}
                                onDateChange={(value) => 
                                    this.setState({ date: moment(value) })
                                                        }
                            />
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                {
                                   this.state.isbookingDateAtSelected && <Button
                                    title='Today'
                                    type='clear'
                                    onPress={() => this.setState({
                                        date: moment()
                                    })}
                                    containerStyle={{
                                        alignItems: 'center'
                                    }}
                                />
                                }
                                <Button
                                    title='Submit'
                                    type='clear'
                                    onPress={() => {
                                        if (this.state.isbookingDateAtSelected) {
                                            console.log("Time::" + this.state.date.format('YYYY-MM-DD'));
                                            this.setState({bookingdate: this.state.date.format('YYYY-MM-DD')});
                                            this.setState({isbookingDateAtSelected: false});
                                        }
                                        this.getFacDetailByDate(this.state.fac_id, this.state.date);
                                        this.setState({
                                            isVisibleTimePicker: false,
                                        })
                                    }}
                                    containerStyle={{
                                        alignItems: 'center'
                                    }}
                                />
                            </View>
                        </View>
                    </Overlay>
            </View>
        )
    }
}