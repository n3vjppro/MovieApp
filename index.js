import { AppRegistry, Dimensions, View, Image } from 'react-native';
import React, { Component } from 'react';

import { TabNavigator, DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation'
//import App from './App';
import MovieStack from './src/components/MoviesComponent'
import FavoritesComponent from './src/components/FavoritesComponent'
import MyInfo from './src/components/My Profile/MyInfo'
import { Movies, Favorites, Profile } from './screenNames'
import HeaderComponent from './src/components/HeaderComponent';
import EditProfile from './src/components/My Profile/EditProfile';
import DrawerSlide from './src/components/DrawerSlide';
import MoviesComponent from './src/components/MoviesComponent';
import Reminder from './src/components/Reminder'

var { height, width } = Dimensions.get('window');
let routeConfigs = {
    Movies: {
        screen: MovieStack,

    },
    Favorites: {
        screen: FavoritesComponent,
    },
    Reminder:{
        screen: Reminder,
    }
};

let tabNavigatorConfigs = {

    tabBarPosition: 'bottom',
    animationEnabled: true,
    
    swipeEnabled: true,
    tabBarOptions: {
        showIcon: true,
        labelStyle: {
			fontSize: 10,
			
		},
        style: {
            padding: -10,
            backgroundColor:'white',
        },
        //showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'white',
    },
}
const MainScreenTabNavigator = TabNavigator(routeConfigs, tabNavigatorConfigs);

// export class MainScreenTab extends Component {
//     static navigationOptions = {
//         //drawerLabel: <MyInfo />
//     };
//     render() {
//         console.log('MainScreenTab', this.props.drawerNavigation);
//         return (
//             < View style={{
//                 flex: 1,
//                 flexDirection: 'column'
//             }
//             }>
//                 < MainScreenTabNavigator  />
//             </View >
//         );
//     }
// }

let drawerRouteConfigs = {
    MainScreenTab: {
        screen: MainScreenTabNavigator,
    },
    EditProfile: {
        screen: EditProfile,
    },
    Reminder:{
        screen:Reminder,
    }
};

let drawerNavigatorConfig = {
    //initialRouteName: MoviesComponent,
    drawerWidth: 2 * width / 3,
    contentComponent: props => <DrawerSlide {...props} />,
};

const Draw = DrawerNavigator(drawerRouteConfigs, drawerNavigatorConfig);

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
