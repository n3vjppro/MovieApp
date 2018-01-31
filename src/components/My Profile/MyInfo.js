import React, { Component } from 'react';
import {
    Text, View, Image,
    Dimensions, TouchableOpacity,AsyncStorage
} from 'react-native';

export default class MoviesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            email:'',
            name:'',
            sex:0,
            birthDay:''
        }
    }
    getData= async()=>{
        try {
            console.log('value');
        const value = await AsyncStorage.getItem('userInfo');
        if (value !== null){
           // console.log(JSON.parse(value));
         this.setState({
             name : JSON.parse(value).name,
             email: JSON.parse(value).email,
             birthDay:    JSON.parse(value).birthday,
             sex:JSON.parse(value).sex,   
             avatarSource:JSON.parse(value).avatar,      
            }) 
        //console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }
componentDidMount(){
    this.getData();
    //console.log('nahn');
}
componentDidUpdate(){
    this.getData();
}
   

    render() {
        var { height, width } = Dimensions.get('window');
        
        return (
            <View>
                <View style={{
                    //flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'center' 
                }}>
                    {this.state.avatarSource == null ?
                                <Image
                                    source={require('../../icons/ava.jpg')}
                                    style={{ width: width / 2, height: width / 2, borderRadius: 90, marginTop: 34 }}
                                ></Image> :
                                <Image style={{ width: width / 2, height: width / 2, borderRadius: 90, marginTop: 34 }}
                                 source={this.state.avatarSource} />
                            }

                    <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.state.name}</Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: 'row', margin: 10 }}>
                    <Image
                        source={require('../../icons/calendar-today.png')}
                        style={{ width: 22, height: 22 }}
                    ></Image>

                    <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                        <Text
                            style={{ marginLeft: 10 }}
                        >{this.state.birthDay}</Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: 'row', margin: 10 }}>
                    <Image
                        source={require('../../icons/at.png')}
                        style={{ width: 22, height: 22 }}
                    ></Image>

                    <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                        <Text
                            style={{ marginLeft: 10 }}
                        >{this.state.email}</Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: 'row', margin: 10 }}>
                    <Image
                        source={require('../../icons/account-edit.png')}
                        style={{ width: 22, height: 22 }}
                    ></Image>

                    <View style={{ backgroundColor: 'white', alignSelf: 'center' }}>
                        <Text
                            style={{ marginLeft: 10 }}
                        >{this.state.sex==1?'Male':'Female'}</Text>
                    </View>
                </View>
                <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}
              style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#4206ff', height: 35, width: 80, alignSelf: 'center', borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

