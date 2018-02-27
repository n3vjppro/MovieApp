import React, { Component } from 'react';
import { Text, Button, View, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import HeaderComponent from './HeaderComponent';
import {StackNavigator} from 'react-navigation'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { deleteReminder, queryAllReminder } from './database/allSchemas'
import realm from './database/allSchemas';
import Swipeout from 'react-native-swipeout';
import PushController from './PushController'
import PushNotification from 'react-native-push-notification';

let FlatListItem = props => {
    const { index, item } = props;

    // showUnloveConfirmation = (id) => {
    //     Alert.alert(
    //         'UnFavorite',
    //         'Are yo sure?',
    //         [
    //             {
    //                 text: 'No', onPress: () => { },
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Yes', onPress: () => {
    //                     deleteFavorite(id).then().catch(error => {
    //                         alert('Failed. Try again!')
    //                     })
    //                 }
    //             }
    //         ],
    //         { cancelable: true }
    //     )
    // }

    const swipeSettings = {
        autoClose: true,
        onClose: () => {
                        
        },          
        onOpen: () => {
            
        },      
        right: [
            { 
                onPress: () => {
                    Alert.alert(
                        'Alert',
                        'Are you sure you want to delete this reminder?',
                        [{
                            text: 'Cancel',
                            onPress: () => {
                            }
                        },
                        {
                            text: 'OK',
                            onPress: () => {
                                deleteReminder(item.id).then(
                                    PushNotification.cancelLocalNotifications({id: item.id.toString()})
                                )
                            }
                        }]
                    )
                },
                text: 'Delete',
                type: 'delete'
            }
        ],  
        rowId: index, 
        sectionId: 1    
    }; 
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor:  'mediumseagreen' ,

        }}>
            <Swipeout
                {...swipeSettings}
                >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'mediumseagreen'
                    
                }}>
                    <Text style={styles.flatListItemTitle}  >{item.title}</Text>
                   
                </View>
                <View style={{
                    padding: 5,
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'mediumseagreen'
                }}>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w185' + item.poster_path }}
                        style={{ width: 120, height: 120, resizeMode: Image.resizeMode.contain, }}
                    >

                    </Image>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        //height: 150
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.flatListItemSub}>Release date:</Text>
                            <Text style={styles.flatListItemDetail}>{item.release_date}</Text>
                        </View>
                       

                        <Text style={styles.flatListItemSub}>Reminder:</Text>
                        <Text numberOfLines={3} style={styles.flatListItemDetail}>{(item.remindTime)}</Text>
                    </View>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'white'
                }}>

                </View>
            </Swipeout>
            
        </View>
    );
}
const styles = StyleSheet.create({
    flatListItemTitle: {
        height: 35,
        color: 'black',
        padding: 3,
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 5,

    },
    flatListItemSub: {
        color: 'white',
        padding: 3,
        fontSize: 14,
        fontWeight: 'bold',
    },
    flatListItemDetail: {
        color: 'white',
        padding: 3,
        fontSize: 14,

    }
});
export  class Reminder extends Component {

    constructor(props) {

        super(props);
        this.state = {
            refreshing: false,
            page: 1,
            reminderList: [],
            love: false,
           
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Setting';
        let tabBarIcon = () => (
            <Image
                source={require('../icons/settings.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        )
        return { tabBarLabel, tabBarIcon };
    }

    reloadData = () => {
        queryAllReminder().then((reminderList) => {
            //console.log(reminderList)
            this.setState({ reminderList: reminderList });
            //console.log(this.state.favoriteList)
        }).catch((error) => {
            this.setState({ reminderList: [] })
        });
        //console.log('reload')
    };
    
    render() {
        return (
           
            <View >

                <FlatList
                    data={this.state.reminderList}
                    numColumns={1}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) =>
                        // <View>
                        // <Text>{item.title}</Text>
                        // {console.log(`item = ${JSON.stringify(item)}, index = ${index}`)}
                        // </View>



                        <FlatListItem item={item} index={index}  />
                    }
                // }

                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this.onRefresh}
                //     />
                // }
                // onEndReached={this.loadMore}
                // onEndReachedThreshold={3}
                >

                </FlatList>
                {/* <Text>BBBB</Text> */}

            </View>
        );
    }
}

const SettingStack = StackNavigator({
    Setting: {
        screen: Reminder,
        navigationOptions: ({ navigation }) => ({
            title: "Reminder",
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={require('../icons/menu.png')}
                    />
                </TouchableOpacity>
            ),

        })


        // screen: MoviesComponent
    },
    
},
    {
    }

);
export default SettingStack;