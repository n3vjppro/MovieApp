import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity,
    Dimensions, StyleSheet,
    Button, ScrollView, CameraRoll, ListView, TouchableHighlight,PixelRatio,
} from 'react-native';
import HeaderComponent from '../HeaderComponent'
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';



export default class EditProfile extends React.Component {
    static navigationOptions = {
        title: 'Edit Profile',
    }
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
        }

    }
    _donePress=()=>{

        this.props.navigation.navigate('MainScreenTab',{
            avatarSource: this.state.avatarSource,
        } )
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
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View>
                {/* <HeaderComponent {...this.props} /> */}
                <View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:15 }}>
                        <Button
                            title="CANCEL"
                            style={{ backgroundColor: "green" }}
                            onPress={() => { this.props.navigation.navigate('MainScreenTab') }}
                        >

                        </Button>

                        <Button
                            title="APPLY"
                            style={{ backgroundColor: 'blue' }}>
                            onPress={() => { }}
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
                            <Text>Name</Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'row', margin: 10 }}>
                        <Image
                            source={require('../../icons/calendar-today.png')}
                            style={{ width: 22, height: 22 }}
                        ></Image>

                        <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                            <Text
                                style={{ marginLeft: 10 }}
                            >01-12-1995</Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'row', margin: 10 }}>
                        <Image
                            source={require('../../icons/at.png')}
                            style={{ width: 22, height: 22 }}
                        ></Image>

                        <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                            <Text
                                style={{ marginLeft: 10 }}
                            >ngongocnhan.95@gmail.com</Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'row', margin: 10 }}>
                        <Image
                            source={require('../../icons/account-edit.png')}
                            style={{ width: 22, height: 22 }}
                        ></Image>

                        <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                            <Text
                                style={{ marginLeft: 10 }}
                            >Boy</Text>
                        </View>
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
