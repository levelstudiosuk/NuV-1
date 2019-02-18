import React from 'react';
import { StyleSheet, ImageBackground, ImageEditor, Alert, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import VWayToggle from '../../components/VWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import axios from 'axios';
import SubmittedFormSpinner from '../../components/SubmittedFormSpinner.js';
import ImageManipulator from '../../components/ImageManipulator.js';

export default class CropperHoldingPage extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}

  constructor(props) {
  super(props);

  this.onToggleModal = this.onToggleModal.bind(this);

}

  state = {
      spinner: false,
      cropperVisible: false
    };

    componentDidMount(){
      this.setState({
        navigation: this.props.navigation
      })
    }

    onToggleModal() {
      this.setState({ cropperVisible: !this.state.cropperVisible })

    }

    processRegistration(){
      if (this.fieldCompletionCheck() === "Complete"){
      this.setState({
        processingRegistration: true,
        spinner: true
      },
    function(){
      this.postData();
    })
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    var image = 'https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg'

    var uri = 'https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg'

    return (

      <View style={registerUserStyle.container}>

      <SubmittedFormSpinner spinner={this.state.spinner} />

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={registerUserStyle.container}>

        {this.state.image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />
        }

        {image && !this.state.image &&

        <ImageBackground
              resizeMode="contain"
              style={{
                  justifyContent: 'center', padding: 20, alignItems: 'center', height: 350, width: 350, backgroundColor: 'transparent',
              }}
              source={{ uri: 'https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg' }}
          >


          <ImageManipulator
                  photo={ {uri} }
                  isVisible={this.state.cropperVisible}
                  onPictureChoosed={uriM => this.setState({ image: uriM })}
                  onToggleModal={this.onToggleModal}
              />

              <GlobalButton
                 buttonTitle="Crop image"
                 onPress={() => this.setState({ cropperVisible: true })}/>


          </ImageBackground>
        }

          <View style={registerUserStyle.submitContainer}>
          <GlobalButton
             buttonTitle="Submit"
              onPress={() => this.patchCroppedImage()}/>
          </View>

          </View>

          </ScrollView>

      </View>
    );
  }
}

const registerUserStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.3 : Dimensions.get('window').height*0.3
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
