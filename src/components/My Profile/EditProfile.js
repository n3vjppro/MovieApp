import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import HeaderComponent from '../HeaderComponent'

export default class MoviesComponent extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        
        let drawerLabel=  <View style={{
            flex: 1,
            flexDirection: 'column',
            // alignItems: 'center',justifyContent: 'center' 
        }}>

            <Image
                source={require('../../icons/calendar-today.png')}
                style={{flex:1, width: 26, height: 26}}
            ></Image>
        </View>;
        
        
        return { drawerLabel };

    }

    render() {
        return (
           <View style={{flex:1}}>
                   <HeaderComponent {...this.props}/>

           </View>
        );
    }
}