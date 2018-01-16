import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

export default class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;
        let drawerLabel = 'My App';
        let drawerIcon = () => (
            <Image
                source={require('../icons/menu.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        )
        return { drawerLabel, drawerIcon };}
    render() {
        return (
            
            <View style={{flex: 1}}>
                <Text>Profile</Text>

            </View>
        );
    }
}