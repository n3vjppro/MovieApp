import { AppRegistry, Dimensions, View, Image } from 'react-native';
import React, { Component } from 'react';

import {TabNavigator, DrawerNavigator, StackNavigator} from 'react-navigation'
//import App from './App';
import MoviesComponent from './src/components/MoviesComponent'
import FavoritesComponent from './src/components/FavoritesComponent'
import MyInfo from './src/components/My Profile/MyInfo'
import {Movies, Favorites, Profile} from './screenNames'
import HeaderComponent from './src/components/HeaderComponent';
import EditProfile from './src/components/My Profile/EditProfile'

var{height, width} = Dimensions.get('window');
let routeConfigs ={
Movies:{
    screen: MoviesComponent,
},
Favorites:{
    screen: FavoritesComponent,
}
};

let tabNavigatorConfig={
    
    tabBarPosition: 'bottom',
    animationEnabled:true,
    swipeEnabled: true,
    tabBarOptions:{
        style:{
            padding: -10
        },
        //showLabel: false,
        activeTintColor:'black',
        inactiveTintColor:'white',
},
}
const MainScreenTabNavigator = TabNavigator(routeConfigs, tabNavigatorConfig);

export class MainScreenTab extends Component{
    static navigationOptions={
     drawerLabel : <MyInfo />
};
    render(){
        return(
        <View style={{
            flex:1,
            flexDirection:'column'}}>
        <HeaderComponent {...this.props}/>
        <MainScreenTabNavigator/>
        </View>
        );
    }
}

let drouteConfigs ={
    MyInfo:{
        screen: MainScreenTab,
       
    },
    EditProfile:{
        screen: EditProfile,
    }


    };

let drawerNavigatorConfig={
    //initialRouteName: MoviesComponent,
    drawerWidth: 2*width/3,
    drawerPosition:'left',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle',
};


const Draw = DrawerNavigator(drouteConfigs,drawerNavigatorConfig );

// const RootNavigator =
// StackNavigator({
//     Drawer: {
//         name: 'Drawer',
//         screen: DrawerNavigator(
//             drouteConfigs,drawerNavigatorConfig
//         ),
//     },
//     ...routeConfigs
// },tabNavigatorConfig,
//     {
//         headerMode: 'none'
//     }
// );

AppRegistry.registerComponent('MovieApp', () => Draw);
