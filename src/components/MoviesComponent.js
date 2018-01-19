import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity, } from 'react-native';
import HeaderComponent from './HeaderComponent'
import { api_now_playing } from '../../api'


export default class MoviesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesPlaying: [],
        }
    }
    // componentWillMount() {
    //     fetch(api_now_playing)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             //return responseJson.movies;
    //             console.log(responseJson)
    //             //   return responseJson.results 
    //             this.setState(() => {
    //                 moviesPlaying: responseJson.results
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    componentDidMount() {
       return(
        fetch(api_now_playing)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState( {moviesPlaying: responseJson.results})
            console.log(this.state)
        })
        .catch((error) => {
            console.log(error);
        })
       )
    }
    // getMoviesNowPlaying = () => {
    //     console.log('HI Nathan')
    //     fetch(api_now_playing)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             //return responseJson.movies;
    //             console.log(responseJson)
    //             //   return responseJson.results 
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    // refreshData = () => {
    //     this.getMoviesNowPlaying.then((movies) => {
    //         moviesPlaying: movies
    //     }).catch((error));
    // }
    static navigationOptions = ({ navigation }) => {

        let tabBarLabel = 'Movies';
        let drawerLabel = 'Notifications';

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
            <View style={{ flex: 1, marginTop: 22 }}>
                <FlatList
                    data={this.state.moviesPlaying}
                    renderItem={( {item, index} ) => <Text>{item.title}</Text>}
                    keyExtractor={(item, index) => item.id}
                >

                </FlatList>


            </View>
        );
    }
}

class FlatListItem extends Component {
    render() {
        return (
            // <View style={{
            //     flex: 1,
            //     flexDirection:'column',                                
            // }}>            
            // {/* <View style={{
            //         flex: 1,
            //         flexDirection:'row',
            //         // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
            //         backgroundColor: 'mediumseagreen'
            // }}>             */}
            //     {/* <Image 
            //         source={{uri: this.props.item.imageUrl}}
            //         style={{width: 100, height: 100, margin: 5}}
            //     >

            //     </Image> */}
            <View style={{
                flex: 1,
                flexDirection: 'column',
                height: 100
            }}>
                <Text style={styles.flatListItem}>{this.props.item.title}</Text>
                <Text style={styles.flatListItem}>{this.props.item.overview}</Text>
            </View>
            // {/* </View> */}
            // {/* <View style={{
            //     height: 1,
            //     backgroundColor:'white'                            
            // }}>

            // </View> */}
            //   </View>
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});
