import React, { Component } from 'react';
import { Text, Button, View, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import HeaderComponent from './HeaderComponent';
import {StackNavigator} from 'react-navigation'



let FlatListItem = props => {
    const { index, item } = props;

    showUnloveConfirmation = (id) => {
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
                        deleteFavorite(id).then().catch(error => {
                            alert('Failed. Try again!')
                        })
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
            backgroundColor: index % 2 == 0 ? 'mediumseagreen' : 'tomato',

        }}>
            {/* <TouchableOpacity
        //         onPress={
        //             () =>
        //                 props.navigation.navigate('DetailMovie', { detail: item, source:"../icons/heart.png" })

        //         }

        //     >
        //         <View style={{
        //             flex: 1,
        //             flexDirection: 'row',
        //             justifyContent: 'space-between'
        //         }}>
        //             <Text style={styles.flatListItemTitle}  >{item.title}</Text>
        //             <TouchableOpacity
        //                 onPress={() => {

        //                     this.showUnloveConfirmation(item.id);
        //                 }}
        //             >
        //                 <Image
        //                     style={{ width: 22, height: 22, marginTop: 3, marginRight: 5 }}
        //                     source={require('../icons/heart.png')}></Image>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={{
        //             padding: 5,
        //             flex: 1,
        //             flexDirection: 'row',
        //             //backgroundColor: 'mediumseagreen'
        //         }}>
        //             <Image
        //                 source={{ uri: 'https://image.tmdb.org/t/p/w185' + item.poster_path }}
        //                 style={{ width: 120, height: 120, resizeMode: Image.resizeMode.contain, }}
        //             >

        //             </Image>
        //             <View style={{
        //                 flex: 1,
        //                 flexDirection: 'column',
        //                 //height: 150
        //             }}>
        //                 <View style={{ flexDirection: 'row' }}>
        //                     <Text style={styles.flatListItemSub}>Release date:</Text>
        //                     <Text style={styles.flatListItemDetail}>{item.release_date}</Text>
        //                 </View>
        //                 <View style={{ flexDirection: 'row' }}>
        //                     <Text style={styles.flatListItemSub}>Rating:</Text>
        //                     <Text style={styles.flatListItemDetail}>{item.vote_average}</Text>
        //                 </View>

        //                 <Text style={styles.flatListItemSub}>Overview:</Text>
        //                 <Text numberOfLines={3} style={styles.flatListItemDetail}>{item.overview}</Text>
        //             </View>
        //         </View>
        //         <View style={{
        //             height: 1,
        //             backgroundColor: 'white'
        //         }}>

        //         </View>
        //     </TouchableOpacity> */}
            <Text>AAAA</Text>
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
export  class Reminder extends Component {

    constructor(props) {

        super(props);
        this.state = {
            refreshing: false,
            page: 1,
            favoriteList: [],
            love: false,
           
        };
       
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Setting';
        let tabBarIcon = () => (
            <Image
                source={require('../icons/settings.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        )
        return { tabBarLabel, tabBarIcon };
    }
    
    render() {
        return (
            //<HeaderComponent/>
            <View >

                {/* <FlatList
                    data={this.state.favoriteList}
                    numColumns={1}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) =>
                        // <View>
                        // <Text>{item.title}</Text>
                        // {console.log(`item = ${JSON.stringify(item)}, index = ${index}`)}
                        // </View>



                        <FlatListItem item={item} index={index} navigation={this.props.navigation} />
                    }
                // }

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
                <Text>BBBB</Text>

            </View>
        );
    }
}

const SettingStack = StackNavigator({
    Setting: {
        screen: Reminder,
        navigationOptions: ({ navigation }) => ({
            title: "Reminder",
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
    
},
    {
    }

);
export default SettingStack;