import React, { Component } from 'react';
import {
  Image,
  View,
  ListView,
  StyleSheet,
  Text, PixelRatio,
  TouchableHighlight, TouchableOpacity, CameraRoll

} from 'react-native';
import ImagePicker from 'react-native-image-picker';
//import SelectedPhoto from './EditProfile';

class ViewPhotos extends Component {
  state = {

    avatarSource: null,

  };



  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    console.log(ImagePicker.showImagePicker);
    //console.log('Response = ', response);
    ImagePicker.launchImageLibrary(options, (response) => {

      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

          <View style={styles.ImageContainer}>

            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.avatarSource} />
            }

          </View>

        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1'
  },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',

  },

});

export default ViewPhotos;