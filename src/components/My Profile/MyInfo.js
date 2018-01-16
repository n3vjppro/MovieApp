import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export default class MoviesComponent extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',justifyContent: 'center' 
            }}>
                <Image
                    source={require('../../icons/ava.jpg')}
                    style={{flex:1, width: 120, height: 120, borderRadius:60}}
                ></Image>

                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Name</Text>
                </View>

                       </View>
        );
    }
}