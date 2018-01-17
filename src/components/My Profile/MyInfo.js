import React, { Component } from 'react';
import {
    Text, View, Image,
    Dimensions, TouchableOpacity
} from 'react-native';

export default class MoviesComponent extends Component {
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View>
                <View style={{
                    //flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'center' 
                }}>
                    <Image
                        source={require('../../icons/ava.jpg')}
                        style={{ width: width / 2, height: width / 2, borderRadius: 90, marginTop: 34 }}
                    ></Image>

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
                <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}
              style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', height: 35, width: 80, alignSelf: 'center', borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}