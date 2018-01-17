import React, { Component } from 'react';
import {
    Text, View, Image,
    TouchableHighlight
} from 'react-native';

import { DrawerItems } from 'react-navigation';
import MyInfo from './My Profile/MyInfo'
import EditProfile from './My Profile/EditProfile'
export default class DrawerSlide extends Component {
    render() {
        //console.log("Drawable slide", this.props.items);
        return (
            <View style={{ flex: 1, flexDirection: 'column', }}>
                <MyInfo navigation={this.props.navigation} />
                {/* <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('EditProfile')}
                >
                    <Text>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('MainScreenTab')}
                >
                    <Text>Home</Text>
                </TouchableHighlight> */}
                {/* <DrawerItems {...this.props} /> */}
            </View>
        );
    }
}