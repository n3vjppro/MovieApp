import React, { Component } from 'react';
import { Text, Button, View, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';

import HeaderComponent from './HeaderComponent';
import { Favorites } from '../../screenNames';
import DetailFavorite from './DetailFavorite'
import { StackNavigator } from 'react-navigation'
import { updateFavorite, insertNewFavorite, deleteFavorite, queryAllFavorite } from './database/allSchemas'
 import realm from './database/allSchemas'


let FlatListItem = props => {
    const { index, item } = props;

    showUnloveConfirmation = () => {
        Alert.alert(
            'UnFavorite',
            'Are yo sure?',
            [
                {
                    text: 'No', onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {

                    }
                }
            ],
            { cancelable: true }
        )
    }
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato',

        }}>
            <TouchableOpacity
                onPress={
                    () =>
                        this.props.navigation.navigate('DetailMovie', { detail: this.props.item })

                }

            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.flatListItemTitle}  >{this.props.item.title}</Text>
                    <TouchableOpacity
                        onPress={() => {

                            this.showUnloveConfirmation;
                        }}
                    >
                        <Image
                            style={{ width: 22, height: 22, marginTop: 3, marginRight: 5 }}
                            source={require('../icons/heart-outline.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{
                    padding: 5,
                    flex: 1,
                    flexDirection: 'row',
                    //backgroundColor: 'mediumseagreen'
                }}>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w185' + this.props.item.poster_path }}
                        style={{ width: 120, height: 120, resizeMode: Image.resizeMode.contain, }}
                    >

                    </Image>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        //height: 150
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.flatListItemSub}>Release date:</Text>
                            <Text style={styles.flatListItemDetail}>{this.props.item.release_date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.flatListItemSub}>Rating:</Text>
                            <Text style={styles.flatListItemDetail}>{this.props.item.vote_average}</Text>
                        </View>

                        <Text style={styles.flatListItemSub}>Overview:</Text>
                        <Text numberOfLines={3} style={styles.flatListItemDetail}>{this.props.item.overview}</Text>
                    </View>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'white'
                }}>

                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    flatListItemTitle: {
        height: 35,
        color: 'black',
        padding: 3,
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 5,

    },
    flatListItemSub: {
        color: 'white',
        padding: 3,
        fontSize: 14,
        fontWeight: 'bold',
    },
    flatListItemDetail: {
        color: 'white',
        padding: 3,
        fontSize: 14,

    }
});
export class FavoritesComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {           
            refreshing: false,
            page: 1,
            favoriteList: [],
            love: false,
        };
        // this.reloadData();
        // realm.addListener('change', () => {
        //     this.reloadData();
        // })
    }

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
    reloadData = () => {
        queryAllFavorite().then((favoriteList) => {
            this.setState({ favoriteList:favoriteList });
        }).catch((error) => {
            this.setState({ favoriteList: [] })
        });
        console.log('reload')
    }
    render() {
        return (
            <View >

                {/* <FlatList
                    data={this.state.favoriteList}
                    numColumns={1}
                    renderItem={({ item, index }) =>
                        // <View>
                        // <Text>{item.title}</Text>
                        // </View>
                        // }

                        //console.log(`item = ${JSON.stringify(item)}, index = ${index}`);
                        <FlatListItem  item={...item} index={index} />

                    }
                    keyExtractor={item => item.id}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={this.onRefresh}
                    //     />
                    // }
                    // onEndReached={this.loadMore}
                    // onEndReachedThreshold={3}
                >

                </FlatList> */}
                <Text>aa</Text>
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