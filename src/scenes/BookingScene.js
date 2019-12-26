import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Input, Text, Button, ListItem, Divider, Rating, Overlay } from 'react-native-elements';
import Styles  from '../styles/HomeStyle'
import { StackActions, NavigationActions } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BookingDetail from './BookingDetail';
import BookingHistoryScene from './BookingHistoryScene';
import ServerAPIUri from '../api_url/ServerAPIUri';


import Qs from  'qs'
import Axios from 'axios'
import CurrentBooking from './CurrentBooking';

class BookingScene extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            facilityList: [{
                id:'1',
                name: 'facility1',
                unit_price: '100',
                available_from : '',
                available_to : '',
                avg_rate:2
            },{
                id: '2',
                name: 'facility2',
                unit_price: '200',
                available_from : '',
                available_to : '',
                avg_rate:2
            },{
                id:'3',
                name: 'facility3',
                unit_price: '300',
                available_from : '',
                available_to : '',
                avg_rate:2
            }
            ],
            nickname: '',
            password: '',
            selected_id: 1,
            selected_ratings: 3,
            isRatingModalVisible: false
        }

    }
    static navigationOptions = {
        header: null
    };

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
            const nickname = await AsyncStorage.getItem('nickname')
            const password = await AsyncStorage.getItem('password')
            this.setState({
                nickname: nickname,
                password: password
            })
            // this.getAllFacs(nickname, password)
            // console.log(nickname)
            // console.log(password)
            this.getAllFacs();
        } catch (e) {
            console.log(e)
        }
    }

    getAllFacs = () => {
        
        // this.getStorageData('nickname');
        // this.getStorageData('password');

        let url = ServerAPIUri.getAllFacs;
        
        console.log("107: " + this.state.nickname);
        
        Axios.post(url, Qs.stringify({

            nickname: this.state.nickname,
            password: this.state.password

        })).then((response) => {

            console.log("foewf" + JSON.stringify(response.data))

            this.setState({facilityList: response.data.data['list']});

        }).catch((err) => {

            console.log("df " +err)

        })
    }
    ratingCompleted = (ratings) => {

        console.log(":::FAcID"+ratings);
        this.setState({selected_ratings: ratings});
    }

    submitRatings = () => {
        let fac_id = this.state.selected_id;
        let url = ServerAPIUri.ratingUri + "/"+fac_id;
        console.log("ServerAPIUri.ratingUri" + fac_id+this.state.nickname+this.state.password);
        const data = Qs.stringify({
            nickname: this.state.nickname,
            password: this.state.password,       
            rating: this.state.selected_ratings
        })
        this.setState({isRatingModalVisible: false});
        Axios.post(url, data).
            then((res) => {
                if (res)
                {
                    console.log("response " + res.data['success']);
                    if (res.data['success'] === true){
                        alert('Rating Success!');
                        
                    }
                }           
        }).catch((err) => {
            console.log(err)
        })
    }
    renderItem = ({ item }) => (
        <ListItem  
            onPress={
            ()=>{
                this.props.navigation.navigate('BookingDetail', { FacID:item.id})}
                     }
            style = {{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.9,
                borderBottomColor: 'lightgray',
                paddingVertical: 5,
                paddingHorizontal: 8,
                alignItems: 'baseline'
            }}
            title = {item.name}
            titleStyle = {{
                fontSize: 20,
                color: 'red',
                marginBottom:10,
                fontWeight: 'bold'
            }}
            subtitle = {
                <View>
                    <Text
                        //onPress={() => this.props.navigation.navigate('BookingDetail')}
                        style={{ color: 'green', marginLeft: '10%' }}
                    >
                        price: {item.unit_price} $ / h
                    </Text>
                </View>
            }
            rightIcon={
                    <View style={{flex:1, justifyContent:'space-between'}}>
                        <Rating
                            //showRating
                            readonly
                            imageSize = {25}
                            //this.setState({selected_id: item.id})}}
                            style={{ paddingVertical: 10}}
                            //ratingCount = {3}
                            startingValue = { item.avg_rate }
                        >   
                        </Rating>
                        <Button style={{width:'10%', flex:0.1}}
                        title="Click here to rate!"
                        onPress = {() => this.setState({isRatingModalVisible: true, selected_id: item.id})}></Button>
                    </View>
            }
            >     
        </ListItem>
    ) 

    render(){
        return(
            <View style = { Styles.container}>
                <Text 
                h4
                style = { Styles.title}>
                    Please Select a Facility
                </Text>
                
                <FlatList 
                    style = { {width: '100%'}}
                    keyExtractor = {(item,index) => index.toString()}
                    data = {this.state.facilityList}
                    renderItem = {this.renderItem}> 
                </FlatList>
                
                <Divider style = {{backgroundColor: 'blue'}} />
                <Overlay 
                    isVisible = {this.state.isRatingModalVisible}
                    containerStyle = {{flex:1, alignItems: 'center',justifyContent:'center',paddingTop:20}}
                    overlayStyle={{
                        width: 330,
                        height: 230
                    }}
                    onBackdropPress={() => this.setState({
                        isRatingModalVisible: false
                    })}
                >
                    <View>
                        <Text
                            style = {{fontWeight: 'bold',fontSize: 20, alignSelf:'center',marginTop: 20}}>
                            Please Take your ratings!
                        </Text>
                        <Rating           
                        onFinishRating = {this.ratingCompleted}
                        //this.setState({selected_id: item.id})}}
                        style={{ paddingVertical: 10}}
                        //ratingCount = {3}
                        
                        >
                        </Rating>
                        <Button
                            title="Submit"
                            buttonStyle={{width:'50%', alignSelf: 'center', marginTop:20}}
                            onPress = {() => this.submitRatings()}>
                        </Button>    
                    </View>                
                </Overlay>
            </View>
            
        );
    }
    
}
const AppNavigator = createStackNavigator({
    Booking: BookingScene,
    BookingDetail: BookingDetail,
    BookingHistory: BookingHistoryScene,
    BookingEdit: CurrentBooking
    
})

export default createAppContainer(AppNavigator)