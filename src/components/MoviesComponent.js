import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import HeaderComponent from './HeaderComponent'
export default class MoviesComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Movies';
        let drawerLabel= 'Notifications';
        
        let tabBarIcon = () => (
            <Image
                source={require('../icons/home.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        )
        return { tabBarLabel, tabBarIcon };

    }
    render() {
        return (
        <View style={{
            flex:1,
            flexDirection:'column',
        }}>
            
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
               <Text>Movies</Text> 
            </View>
            </View>
        );
    }
}