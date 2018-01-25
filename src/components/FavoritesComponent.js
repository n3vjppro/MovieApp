import React, { Component } from 'react';
import { Text, Button, View, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

import HeaderComponent from './HeaderComponent';
import{Favorites} from '../../screenNames';
import DetailFavorite from './DetailFavorite'
import { StackNavigator } from 'react-navigation'


export  class FavoritesComponent extends Component {
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
            <View style={{
                flex:1,
                flexDirection:'column',
            }}>
            {/* <HeaderComponent {...this.props}/> */}
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Favorites</Text>
            </View>
            </View>
        );
    }
}

const FavoriteStack = StackNavigator({
    Favorites: {
        screen: FavoritesComponent,
        navigationOptions: ({ navigation }) => ({
            title: "Favorites",
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
    DetailFavorite: {

        screen: DetailFavorite,
    },
},
    {
    }

);

export default FavoriteStack;