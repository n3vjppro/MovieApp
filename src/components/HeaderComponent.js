import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

export default class HeaderComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;
        let drawerLabel = 'Menu';
        // let drawerIcon = () => (
        //     <Image
        //         source={require('../icons/menu.png')}
        //         style={{ width: 26, height: 26 }}
        //     ></Image>
        // )
        return { drawerLabel };}
    render() {
        return (
            <View
                style={{
                    height:60,
                    flexDirection:'row',
                    justifyContent:'flex-start',
                    alignItems:'center'
                }}
            >
            <TouchableOpacity
                style={{marginLeft:10}}
                onPress={()=>{
                    const {navigate} = this.props.navigation;
                    navigate('DrawerOpen')
                }}
            >
            <Image 
                style={{width:32, height:32}}
                source={require('../icons/menu.png')}
            />

            </TouchableOpacity>



            </View>
        );
    }
}