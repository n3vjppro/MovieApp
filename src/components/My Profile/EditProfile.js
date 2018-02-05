import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity,
    Dimensions, StyleSheet,
    Button, ScrollView, CameraRoll, ListView, TouchableHighlight, PixelRatio, TextInput, AsyncStorage

} from 'react-native';
import HeaderComponent from '../HeaderComponent'
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import MyInfo from './MyInfo'
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioButton from 'radio-button-react-native';

export default class EditProfile extends React.Component {
    static navigationOptions = {
        title: 'Edit Profile',
    }
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            textName: '',
            textEmail: '',
            textBirthDay: '',
            isDateTimePickerVisible: false,
            sexValue: 0
        }

    }
    _donePress = () => {

        this.props.navigation.navigate('MainScreenTab', {
            avatarSource: this.state.avatarSource,
        })
    }

    _handleButtonPress = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        console.log(ImagePicker.showImagePicker);
        //console.log('Response = ', response);
        ImagePicker.launchImageLibrary(options, (response) => {

            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    };
    _updateProfile = async () => {
        let userInfo = {
            name: this.state.textName,
            email: this.state.textEmail,
            birthday: this.state.textBirthDay,
            sex:this.state.sexValue,
            avatar: this.state.avatarSource,
        }
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            //MyInfo.updater.enqueueForceUpdate(MyInfo);
            this.props.navigation.navigate('MainScreenTab');

            console.log("aa")
        } catch (error) {
            // Error saving data
        }
    }
    getData = async () => {
        try {
            console.log('value');
            const value = await AsyncStorage.getItem('userInfo');
            if (value !== null) {
                // console.log(JSON.parse(value));
                this.setState({
                    textName: JSON.parse(value).name,
                    textEmail: JSON.parse(value).email,
                    textBirthDay:JSON.parse(value).birthday,
                    sexValue:JSON.parse(value).sex,
                    avatarSource:JSON.parse(value).avatar,
                })
                //console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    componentWillMount() {
        this.getData();
    }

    //Date time picker
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        var month = date.getMonth()+ 1;
        var bd = date.getDate() + "-" + month + "-" + date.getFullYear();
        this.setState({ textBirthDay: bd })
        //console.log('A date has been picked: ', this.state.textBirthDay);
        this._hideDateTimePicker();
    };

    //Radio Button
    handleOnPress=(value)=> {
        this.setState({ sexValue: value })
    }

    render() {
        var { height, width } = Dimensions.get('window');

        return (
            <View>
                {/* <HeaderComponent {...this.props} /> */}
                <View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <Button
                            title="CANCEL"
                            style={{ backgroundColor: "green" }}
                            onPress={() => { this.props.navigation.navigate('MainScreenTab') }}
                        >

                        </Button>

                        <Button
                            title="DONE"
                            style={{ backgroundColor: 'blue' }}
                            onPress={
                                this._updateProfile
                               
                            }>
                        </Button>
                    </View>

                    <View style={{
                        //flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center' 
                    }}>
                        <TouchableOpacity

                            onPress={this._handleButtonPress}

                        >
                            {this.state.avatarSource === null ?
                                <Image
                                    source={require('../../icons/ava.jpg')}
                                    style={{ width: width / 2, height: width / 2, borderRadius: 90, marginTop: 34 }}
                                ></Image> :
                                <Image style={{ width: width / 2, height: width / 2, borderRadius: 90, marginTop: 34 }}
                                    source={this.state.avatarSource} />
                            }

                        </TouchableOpacity>

                        {/* <Button title="Load Images" onPress={this._handleButtonPress} /> */}

                        <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput
                                placeholder='Your name'
                                style={{ marginTop: 10, fontSize: 15, width: width / 2, alignItems: 'center', textAlign: 'center' }}
                                onChangeText={(textName) => this.setState({ textName })}
                                value={this.state.textName}
                            ></TextInput>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'row', margin: 10 }}>
                        <Image
                            source={require('../../icons/calendar-today.png')}
                            style={{ width: 22, height: 22 }}
                        ></Image>

                        <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                {this.state.textBirthDay =='' ?
                                    <Text style={{ marginLeft: 10 }}>Your birthday</Text> :
                                    <Text
                                        style={{ marginLeft: 10 }}
                                    >{this.state.textBirthDay}</Text>
                                }
                                {/* <Text>click</Text> */}

                            </TouchableOpacity>

                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>
                    <View
                        style={{ flexDirection: 'row', margin: 10 }}>
                        <Image
                            source={require('../../icons/at.png')}
                            style={{ width: 22, height: 22 }}
                        ></Image>

                        <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                            <TextInput
                                placeholder='Your email'
                                style={{ marginLeft: 10, width: 200, }}
                                onChangeText={(textEmail) => this.setState({ textEmail })}
                                value={this.state.textEmail}
                            ></TextInput>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'row', margin: 10 }}>
                        <Image
                            source={require('../../icons/account-edit.png')}
                            style={{ width: 22, height: 22 }}
                        ></Image>

                        <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>

                        </View>
                        <RadioButton currentValue={this.state.sexValue} value={0} onPress={this.handleOnPress}>
                            <Text style={{marginLeft:3}}>Female</Text>
                        </RadioButton>

                        <RadioButton currentValue={this.state.sexValue} value={1} onPress={this.handleOnPress}>
                            <Text style={{marginLeft:3}}>Male</Text>
                        </RadioButton>


                    </View>

                </View></View>
        );
    }
}


export const SelectedPhoto = (props) => {
    const { uri } = props;
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: uri }}
                style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 300,
        width: 200
    },
    ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',

    },
});   
