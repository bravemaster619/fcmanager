import React from 'react'
import { View,  ListView, TouchableOpacity } from 'react-native'
import { Button, Text, ListItem, Divider, Overlay } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import TimePicker from "react-native-24h-timepicker";
import moment from 'moment';
import ServerAPIUri from  '../api_url/ServerAPIUri';
import Qs from 'qs';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import BookingHistoryScene from '../scenes/BookingHistoryScene';


export default class CurrentBooking extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            bookingList: [

            ],
            nickname: '',
            password: '',
            isEditModalVisible: false,
            isdeleteModalVisible: false,
            selected_id: 1,
            selected_from: '',
            selected_to: '',
            selected_date:'',
            isbookingFromAtSelected: false,
            isbookingToAtSelected: false,
            isVisibleTimePicker: false,
            isVisibleDatePicker: false,
            index_id: '1'
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

    async componentDidMount () {

        try {
            this.getCurrentBookingList();
        } catch (e) {
            console.log(e)
        }
    }

    getCurrentBookingList = () => {
        
        this.getStorageData('nickname');
        this.getStorageData('password');

        let url = ServerAPIUri.currentBookinglist;
        
        Axios.post(url, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password

        })).then((response) => {
            console.log(response.data);

            console.log(response.data.data['current_booking'])

            this.setState({bookingList: response.data.data['current_booking']});

        }).catch((err) => {

            console.log(err)

        })
    }

    onCancel() {
        this.TimePicker.close();
    }  
    onConfirm(hour, minute) {
        if (this.state.isbookingFromAtSelected){
            this.setState({ selected_from: `${hour}:${minute}` });
        } 
        if (this.state.isbookingToAtSelected) {
            this.setState({ selected_to: `${hour}:${minute}` });
        }
        this.TimePicker.close();
    }

    editBookSubmit = () => {

        if (this.validates()){

            let book_id = this.state.selected_id;
            let uri = ServerAPIUri.currentBookingUpdate + '/'+ book_id;
            let from = this.state.selected_from;
            let to = this.state.selected_to;
            let date = this.state.selected_date;

            console.log("book_id"+"::"+book_id);
            Axios.post(uri, Qs.stringify({

                nickname: this.state.nickname,
                password: this.state.password,
                id:book_id,
                from:from,
                to:to,
                booking_date:date
                
            })).then((response) => {

                if (response.data['success'] === true) {

                    //console.log(response.data.data['current_booking'])
                    alert("Booking Edit Successful");

                    this.setState({isEditModalVisible: false, selected_from: from, selected_to: to});
                    //this.props.navigation.navigate('CurrentBooking');
                
                    let bookingList = this.state.bookingList
                    console.log("CurrentBookingList: ++ " + bookingList[this.state.index_id]);
                    bookingList[this.state.index_id]["from"] = from;
                    bookingList[this.state.index_id]["to"] = to;
                    bookingList[this.state.index_id]["booking_date"] = date;

                    this.setState({
                        bookingList: bookingList
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }    
    }
    deleteBooking = () => {
         
        let book_id = this.state.selected_id;
        let uri = ServerAPIUri.currentBookingCancel + "/" + book_id;
        console.log("book_id"+"::"+book_id);
        Axios.post(uri, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password,
            id:book_id
            
        })).then((response) => {

            // console.log(response.data.data['current_booking'])
            if (response.data['success'] === true){

                this.setState({isdeleteModalVisible: false})
                let bookingList = this.state.bookingList
                bookingList.splice(this.state.index_id, 1);

            this.setState({
                bookingList: bookingList
            })
            alert('Cancel booking success!');
            }
            
        }).catch((err) => {

            console.log(err)

        })
    
    }
    
    validates = () => {
        let from = this.state.selected_from;
        let to = this.state.selected_to;

        if (from ==='' || to === ''){
            alert("Select time!");
            return false;
        }
        return true;
    }
    renderItem = ({ item, index }) => (
        <View 
            style = {{
                flex: 1,
                //flexDirection: 'row',
                justifyContent: 'center',
                borderBottomWidth: 0.9,
                borderBottomColor: 'lightgray',
                paddingVertical: 5,
                paddingHorizontal: 8,
                alignItems: 'flex-end'
            }}> 
            
            
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Text 
                style = {{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
                    {item.name}
                </Text>
                <Text
                    //onPress={() => this.props.navigation.navigate('BookingDetail')}
                style = {{color: 'black',marginLeft: '10%'}}
                >
                    {item.booking_date}
                </Text>
                <Text
                    //onPress={() => this.props.navigation.navigate('BookingDetail')}
                    style={{ color: 'green', marginLeft: '10%' }}
                >
                    {item.from}
                </Text>
                <Text
                    //onPress={() => this.props.navigation.navigate('BookingDetail')}
                    style={{ color: 'green', marginLeft: '10%' }}
                >
                    {item.to}
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
                <Button 
                
                buttonStyle={{ marginRight: 10 }}
                    title="Cancel"
                    onPress={() => this.setState({isdeleteModalVisible: true, selected_id:item.id, index_id: index})}>
                </Button>
                <Button style={{ width: '20%' }}
                    title="Edit"
                    onPress={() => { this.setState({ isEditModalVisible: true, selected_from: item.from, selected_to: item.to, selected_date: item.booking_date,selected_id: item.id, index_id: index }) }}></Button>
            </View>
        </View>
    ) 
    render() {
        return(            
            <View style = {{
                flex:1,
                alignItems:'center',
                justifyContent:'flex-start'}}
                >
                <Text 
                h4
                style = {{
                    marginBottom: 20,
                    marginTop: 20
                }}> Edit your current booking                 
                </Text>
                <FlatList 
                    style = { {width: '100%'}}
                    keyExtractor = {(item,index) => index.toString()}
                    data = {this.state.bookingList}
                    renderItem = {this.renderItem}>
                </FlatList>
                <Overlay 
                    isVisible = {this.state.isEditModalVisible}
                    containerStyle = {{flex:1, alignItems: 'center',justifyContent:'center',paddingTop:20}}
                    overlayStyle={{
                        width: 330,
                        height: 500
                    }}
                    onBackdropPress={() => this.setState({
                        isEditModalVisible: false
                    })}
                >
                    <View>
                        <Text
                            style = {{fontWeight: 'bold',fontSize: 25, alignSelf:'center',marginTop: 20, marginBottom:40}}>
                            Edit your booking
                        </Text>
                        <TouchableOpacity 
                            style = {{marginBottom:  40, backgroundColor: 'grey'}}
                                onPress={() => this.setState({ isVisibleDatePicker: true, isbookingDateAtSelected: true, timePickermode: true })}>
                                <Text
                                    style={{ fontSize: 30, alignSelf: 'center' }}
                                >
                                    {this.state.selected_date}
                                </Text>
                        </TouchableOpacity>
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
                                onPress={() => {
                                    this.TimePicker.open()
                                    this.setState({ isbookingFromAtSelected: true })
                                }
                                }
                            >
                                <Text
                                    style={{ fontSize: 30, alignSelf: 'center' }}
                                >
                                    {this.state.selected_from}
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{ fontSize: 30, alignSelf: 'center' }}
                            >
                                -------
                        </Text>
                            <TouchableOpacity
                                style={{
                                    flex: 1,

                                }}
                                onPress={() => {
                                    this.TimePicker.open()
                                    this.setState({ isbookingToAtSelected: true })
                                }
                                }
                            >
                                <Text
                                    style={{ fontSize: 30, alignSelf: 'center' }}>
                                    {this.state.selected_to}
                                </Text>
                            </TouchableOpacity>  
                        </View>                   
                        <Button
                            title="Submit"
                            buttonStyle={{width:'50%', alignSelf: 'center', marginTop:60, }}
                            onPress = {() => this.editBookSubmit()}>
                        </Button>
                        <TimePicker
                            ref={ref => {
                                this.TimePicker = ref;
                            }}
                            onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => {
                                this.onConfirm(hour, minute)
                                this.setState({ isbookingFromAtSelected: false, isbookingToAtSelected: false })
                            }}
                            itemStyle={{ justifyContent: 'center', alignItems: 'center' }}
                            style={{ alignSelf: 'center' }}
                        />
                        {this.state.isVisibleDatePicker && <DatePicker
                                date={this.state.selected_date}                              
                                mode= 'date'
                                minimumDate = {new Date()}
                                onDateChange={(value) => 
                                         this.setState({ selected_date: moment(value).format('YYYY-MM-DD') })
                                                        }
                                                    />}    
                    </View>                
                </Overlay>
                <Overlay 
                    isVisible = {this.state.isdeleteModalVisible}
                    containerStyle = {{flex:1, alignItems: 'center',justifyContent:'center',paddingTop:20}}
                    overlayStyle={{
                        width: 330,
                        height: 230
                    }}
                    onBackdropPress={() => this.setState({
                        isdeleteModalVisible: false
                    })}>
                        <View 
                            style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                            <Text style={{fontSize: 20, paddingTop: 20, alignSelf: 'center'}}>
                                Are you sure cancelling this booking?
                            </Text>
                            <Button
                                title = "Delete"
                                onPress = {() => this.deleteBooking()}
                                >
                            </Button>
                        </View>
                </Overlay>
            </View>
        );
    }
}
