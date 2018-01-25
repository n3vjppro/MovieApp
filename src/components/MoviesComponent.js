import React, { Component } from 'react';
import { Text, Button, View, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import HeaderComponent from './HeaderComponent'
import { api_now_playing } from '../../api'
import { StackNavigator } from 'react-navigation'
import MoviesDetail from './MoviesDetail'
import FavoritesComponent from './FavoritesComponent'


export class MoviesComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            moviesList: [],
            refreshing: false,
            page: 1,
            favoriteList: [],
            grid:false,
            
        }
    }
    static navigationOptions =({navigation})=> {
        //const { params = {} } = navigation.state;
        //const {setParams} = this.props.navigation;
        //console.log(this.props.navigation.state)
        let tabBarIcon= (
            <Image
                source={require('../icons/home.png')}
                style={{ width: 26, height: 26 }}
            ></Image>
        );
        let headerRight= (
            <TouchableOpacity
                onPress={() => console.log(this.setState({grid:true}))}
                
            >
                <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../icons/grid.png')}
                />
            </TouchableOpacity>
        );
        return{tabBarIcon, headerRight}

        //let tabBarLabel = 'Movies';
    }


    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        const { page } = this.state;
        this.setState({ refreshData: true })
        setTimeout(() => {
            fetch(api_now_playing + page)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ moviesList: [...this.state.moviesList, ...responseJson.results] })
                    this.setState({ refreshData: false })
                    console.log(this.state)
                })
                .catch((error) => {
                    this.setState({ refreshData: false })
                    console.log(error);
                })
        }, 1500);
    }

    onRefresh = () => {

        this.refreshData();
    }
    loadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
            () => {
                this.refreshData();
            })
    }
    updateFavoriteList = (item) => {
        // this. ({favoriteList:this.state.favoriteList})
        this.setState({ favoriteList: [...this.state.favoriteList, item] })
        console.log("AAA", this.state.favoriteList)
    }
    // _gridMode=()=>{
    //     this.setState({grid:this.state.grid+1},()=>{ this.refreshData()});
       
    // }
    render() {
        //console.log('drawer')
        const {setParams} = this.props.navigation;
        console.log(setParams)
        
        return (
            <View style={{ flex: 1, }}>

                <FlatList
                    data={this.state.moviesList}
                    renderItem={({ item, index }) =>
                        // <View>
                        // <Text>{item.title}</Text>
                        // </View>
                        // }

                        //console.log(`item = ${JSON.stringify(item)}, index = ${index}`);
                        <FlatListItem  grid={this.state.grid} updateChild={this.updateFavoriteList} navigation={this.props.navigation} item={item} index={index} />

                    }
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={3}
                >

                </FlatList>


            </View>
        );
    }
}

export class FlatListItem extends Component {
    render() {console.log("aaaa",this.props.grid)
    const {grid}= this.props;
        return (
            
            grid ?
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'
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
                                    this.props.updateChild(this.props.item);
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
                :
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'
                }}>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w185' + this.props.item.poster_path }}
                        style={{ width: 200, height: 200, resizeMode: Image.resizeMode.contain, }}
                    >

                    </Image>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    flatListItemTitle: {
        color: 'black',
        padding: 3,
        fontSize: 16,
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

const MovieStack = StackNavigator({
    Movies: {
        screen:  MoviesComponent ,
        navigationOptions: ({ navigation }) => ({
            title: "Movies",
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
    DetailMovie: {

        screen: MoviesDetail,
    },
},
    {
    }

);

export default MovieStack;
