import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, AppState } from 'react-native';
import { api_get_cast } from '../../api';
import realm from './database/allSchemas';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { insertNewFavorite, queryAllFavorite, updateFavoriteList, deleteFavorite, queryItemFavorite, insertReminder } from './database/allSchemas'
import PushNotification from 'react-native-push-notification';
import PushController from './PushController'

export default class MoviesDetail extends Component {
    constructor(props) {
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            listCasts: [],
            source: '',
            favoriteList: [],
            love: true,
            reminderTime: '',
            isDateTimePickerVisible: false,
            date: new Date(),
            title: ''
        }
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        })
    };



    // loadItem=(id)=>{
    //     queryItemFavorite(id).then(
    //         obj => {
    //             obj != null ? this.setState({ source: '../icons/heart.png' }) : this.setState({ source: '../icons/heart-outline.png' })
    //             console.log(this.state.source)
    //         }
    //     ).catch((error) =>
    //         alert(error)
    //         );
    // }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.detail.title,
        tabBarIcon: (
            <Image
                source={require('../icons/film.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        )
    });
    componentDidMount() {

        AppState.addEventListener('change', this.handleAppStateChange);


        this.setState({
            source: this.props.navigation.state.params.source,
            title: this.props.navigation.state.params.detail.title
        });
        console.log(this.state.source)
    };
    componentWillUnmount() {
        AppState.addEventListener('change', this.handleAppStateChange)
    }
    handleAppStateChange(appState) {
        if (appState === 'background') {
            console.log('app background', this.state.date)
            PushNotification.localNotificationSchedule({
                message: "You set a reminder for this film: " + this.state.title, // (required)
                date: this.state.date // set Date TIme
            });
        }
    }
    reloadData = () => {
        queryAllFavorite().then((favoriteList) => {
            console.log(favoriteList)
            this.setState({ favoriteList: favoriteList });
            console.log(this.state.favoriteList)
        }).catch((error) => {
            this.setState({ favoriteList: [] })
        });
        console.log('reload')
    };

    //Date time picker
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        var month = date.getMonth() + 1;
        var bd = date.getDate() + "-" + date.getHours() + "-" + date.getMinutes();

        this.setState({ date: date })


        //console.log('A date has been picked: ', this.state.textBirthDay);
        this._hideDateTimePicker();
    };


    render() {
        const { params } = this.props.navigation.state;

        fetch(api_get_cast + params.detail.id + "/credits?api_key=0267c13d8c7d1dcddb40001ba6372235")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ listCasts: responseJson.cast })
                //console.log(this.state.listCasts)
            })
            .catch((error) => {
                console.log(error);
            });
        var { height, width } = Dimensions.get('window');
        //this.loadItem(params.detail.id);
        //console.log(params.detail)
        return (
            <ScrollView style={{
                flex: 1,
                flexDirection: 'column'
            }}>

                <Image
                    source={{ uri: 'https://image.tmdb.org/t/p/w500' + params.detail.backdrop_path }}
                    style={{ width: width, height: 9 * width / 16, resizeMode: Image.resizeMode.stretch }}
                >

                </Image>

                <View style={{

                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => {

                            //this.props.updateChild(params.detail);

                            let favoriteList = {
                                title: params.detail.title,
                                id: params.detail.id,
                                overview: params.detail.overview,
                                release_date: params.detail.release_date,
                                poster_path: params.detail.poster_path,
                                backdrop_path: params.detail.backdrop_path,
                                vote_average: params.detail.vote_average + "",
                                love: true,
                            }
                            if (this.state.source == '../icons/heart-outline.png') {
                                insertNewFavorite(favoriteList).then(
                                    this.setState({ source: '../icons/heart.png' })
                                ).catch((error) => {
                                    this.setState({ source: '../icons/heart-outline.png' })
                                    alert(error)
                                })
                            }
                            if (this.state.source == '../icons/heart.png') {
                                deleteFavorite(params.detail.id).then(
                                    this.setState({ source: '../icons/heart-outline.png' })
                                ).catch(error => {
                                    this.setState({ source: '../icons/heart.png' })
                                    alert('Failed. Try again!');
                                })
                            }
                        }}
                    >
                        {this.state.source == '../icons/heart-outline.png' ? <Image
                            style={{ width: 36, height: 36, margin: 10, }}
                            source={require('../icons/heart-outline.png')}
                        >
                        </Image> : <Image
                            style={{ width: 36, height: 36, margin: 10 }}
                            source={require('../icons/heart.png')}
                        >
                            </Image>}
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginLeft: 5,
                            marginTop: 5
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.flatListItemSub}>Release date:</Text>
                            <Text style={styles.flatListItemDetail}>{params.detail.release_date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.flatListItemSub}>Rating:</Text>
                            <Text style={styles.flatListItemDetail}>{params.detail.vote_average}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: '#208fff', justifyContent: 'center', borderRadius: 5, margin: 10 }}
                        onPress={() => {
                            this._showDateTimePicker()

                            let reminderList = {
                                title: params.detail.title,
                                id: params.detail.id,
                                release_date: params.detail.release_date,
                                remindTime: JSON.stringify(this.state.date),
                                poster_path: params.detail.poster_path,
                            }
                            insertReminder(reminderList).then(
                                {

                                }
                            ).catch((error) => {

                                alert('You added this film to Reminder. Please delete it before add again!')
                            })

                        }
                        }


                    >
                        <Text style={{ color: 'white', padding: 5 }}>REMINDER</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        mode='datetime'
                    />
                    <PushController />
                </View>

                <View style={{
                    height: height / 3,
                    flexDirection: 'row',
                    padding: 5
                }}>
                    <Image
                        style={{ width: 2 * width / 5, height: 1 * height / 3, }}
                        source={{ uri: 'https://image.tmdb.org/t/p/w185' + params.detail.poster_path }} />


                    <ScrollView style={{ marginLeft: 5 }} >
                        <Text style={{ fontWeight: 'bold', }}>Overview</Text>
                        <Text >{params.detail.overview}</Text>
                    </ScrollView>
                </View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 5,
                    marginTop: 10,
                }}>Cast & Crew</Text>

                <FlatList
                    horizontal={true}
                    data={this.state.listCasts}
                    renderItem={({ item, index }) =>
                        //console.log(`item = ${JSON.stringify(item)}, index = ${index}`);
                        <View>
                            <Image
                                style={{ width: width / 4, height: width / 3.5, marginRight: 3 }}
                                source={{ uri: 'https://image.tmdb.org/t/p/w185' + item.profile_path }} />


                            <Text style={{ width: width / 4 }} >{item.character}</Text>
                        </View>

                    }
                    keyExtractor={(item, index) => index}
                >

                </FlatList>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flatListItemTitle: {
        color: 'black',
        padding: 3,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,

    },
    flatListItemSub: {

        padding: 3,
        fontSize: 14,
        fontWeight: 'bold',
    },
    flatListItemDetail: {
        color: 'red',
        padding: 3,
        fontSize: 14,

    }
});