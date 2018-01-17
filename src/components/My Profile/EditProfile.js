import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions,StyleSheet, Button, ScrollView,CameraRoll } from 'react-native';
import HeaderComponent from '../HeaderComponent'
import ViewPhotos from './ViewPhotos'
export default class MoviesComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            photoArray: [],
            showPhotos: false
         }
        
    }
    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All',
        })
            .then(r => {
                this.setState({ photoArray: r.edges, showPhotos:true });
            })
            .catch((err) => {
                //Error Loading Images
            });
            <ViewPhotos
            photoArray={this.state.photoArray} />
    };
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View>
                <HeaderComponent {...this.props} />
                <View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            title="CANCEL"
                            style={{ backgroundColor: "green" }}
                            onPress={() => { this.props.navigation.navigate('MainScreenTab') }}
                        >

                        </Button>

                        <Button
                            title="DONE"
                            style={{ backgroundColor: 'blue' }}>
                            onPress={() => { }}
                        </Button>
                    </View>

                    <View style={{
                        //flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center' 
                    }}>
                        <TouchableOpacity
                            onPress={
                                this._handleButtonPress
                            }
                        >
                            <Image
                                source= {this.state.showPhotos?<SelectedPhoto />:require('../../icons/ava.jpg')}
                                style={{ width: width / 2, height: width / 2, borderRadius: 90, marginTop: 34 }}
                            ></Image>
                        </TouchableOpacity>

        {/* <Button title="Load Images" onPress={this._handleButtonPress} /> */}
                        <ScrollView>
                            {this.state.photoArray.map((p, i) => {
                                return (
                                    <Image
                                        key={i}
                                        style={{
                                            width: 300,
                                            height: 100,
                                        }}
                                        source={{ uri: p.node.image.uri }}
                                    />
                                );
                            })}
                        </ScrollView>
                        <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Name</Text>
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
                            >01-12-1995</Text>
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
                            >ngongocnhan.95@gmail.com</Text>
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
                            >Boy</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('EditProfile')}
                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', height: 35, width: 80, alignSelf: 'center', borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Edit</Text>
                    </TouchableOpacity>
                </View></View>
        );
    }
}

export const SelectedPhoto = (props) => {
    const { uri } = props;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: uri}}
          style={styles.image}/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      height: 300,
      width: 200
    }
  });