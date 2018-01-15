import { AppRegistry, Dimensions } from 'react-native';
import {TabNavigator, DrawerNavigator} from 'react-navigation'
//import App from './App';
import MoviesComponent from './src/components/MoviesComponent'
import FavoritesComponent from './src/components/FavoritesComponent'

import {Movies, Favorites, Profile} from './screenNames'
import HeaderComponent from './src/components/HeaderComponent';

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
const App = TabNavigator(routeConfigs, tabNavigatorConfig);

let drouteConfigs ={
    Home:{
        screen: HeaderComponent,
    },
    
    };

let drawerNavigatorConfig={
    //initialRouteName: tabNavigatorConfig,
    drawerWidth: Dimensions.get('window')/2,
    drawerPosition:'left',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle',
};


const Draw = DrawerNavigator(drouteConfigs ,drawerNavigatorConfig);

AppRegistry.registerComponent('MovieApp', () => Draw);
