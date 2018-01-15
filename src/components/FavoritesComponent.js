import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export default class FavoritesComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Favorites';
        let tabBarIcon = () => (
            <Image
                source={require('../icons/heart.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        )
        return { tabBarLabel, tabBarIcon };

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Favorites</Text>
            </View>
        );
    }
}