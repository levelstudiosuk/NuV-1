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
      cropperVisible: false,
      image: null
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
      this.setState({
        processingRegistration: true,
        spinner: true
      },
    function(){
      this.patchCroppedImage();
    })

  }

  patchCroppedImage(){
    var user_profile_end_point = 'http://nuv-api.herokuapp.com/profiles/' + this.props.navigation.getParam('id', 'NO-ID')
    var token = this.props.navigation.getParam('token', 'NO-ID');
    const {navigate} = this.props.navigation;
    var self = this;
    var uriParts = this.state.image ? this.state.image.split('.') : 'file:///Users/james/programming_work/nuv/NuV/assets/wil.jpg'.split('.');
    var fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();

   if (self.state.image){
   formData.append('profile[avatar]', {
      uri: self.state.image,
     name: `${Date.now()}.${fileType}`,
     type: `image/${fileType}`,
    });
  }
    axios.patch(user_profile_end_point,
    formData,
 { headers: { Authorization: `${token}` }}).then(function(response){
   console.log("RESP", response);
   var updatedProfile = JSON.parse(response.request['_response'])
   var uri = updatedProfile.avatar.url

   self.setState({spinner: false}, function(){
     navigate('Home', {name: updatedProfile.name, avatar: uri, bio: updatedProfile.bio, user_is_vegan: updatedProfile.user_is_vegan, location: updatedProfile.location})

   })
 }
 ).catch(function(e){
     console.log(e);
   })
  }

  render() {
    const {navigate} = this.props.navigation;

    var image = this.props.navigation.getParam('avatar', 'NO-ID')

    var uri = this.props.navigation.getParam('avatar', 'NO-ID')

    return (

      <View style={registerUserStyle.container}>

      <SubmittedFormSpinner spinner={this.state.spinner} />

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={registerUserStyle.container}>

      {this.props.navigation.getParam('editingProfile', 'NO-ID') === true && !this.state.imageLoaded  ? (

      <Text style={{fontSize: Dimensions.get('window').width > 750 ? 20 : 14, textAlign: 'center', marginTop: Dimensions.get('window').height*0.035, marginBottom: Dimensions.get('window').height*0.025 }}>
      Hi {this.props.navigation.getParam('name', 'NO-ID')}. To finalise your profile update, please crop your NüV profile picture. This will help us make you a killer profile.{"\n"}{"\n"}
      </Text>

    ) :

    null

  }

      {this.props.navigation.getParam('registering', 'NO-ID') === true && !this.state.imageLoaded ? (

          <Text style={{fontSize: Dimensions.get('window').width > 750 ? 20 : 14, textAlign: 'center', marginTop: Dimensions.get('window').height*0.035, marginBottom: Dimensions.get('window').height*0.025 }}>
          Hi {this.props.navigation.getParam('name', 'NO-ID')}. Just to get you started, please crop your NüV profile picture. This will help us make you a killer profile.{"\n"}{"\n"}
          </Text>

    ) :

    null

    }

        {this.state.image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />
        }

        {image && !this.state.imageLoaded &&

        <ImageBackground
              resizeMode="contain"
              style={{
                  justifyContent: 'center', padding: 20, alignItems: 'center', height: Dimensions.get('window').width > 750 ? this.props.navigation.getParam('height', 'NO-ID')/3 : this.props.navigation.getParam('height', 'NO-ID')/5, width: Dimensions.get('window').width > 750 ? this.props.navigation.getParam('width', 'NO-ID')/3 : this.props.navigation.getParam('width', 'NO-ID')/5, backgroundColor: 'transparent',
              }}
              source={{ uri: this.props.navigation.getParam('avatar', 'NO-ID') }}
          >


          <ImageManipulator
                  photo={ {uri} }
                  isVisible={this.state.cropperVisible}
                  onPictureChoosed={uriM => this.setState({ image: uriM }, function(){
                    this.setState({ imageLoaded: true })
                  })}
                  onToggleModal={this.onToggleModal}
              />

              <GlobalButton
                 buttonTitle="Crop image"
                 onPress={() => this.setState({ cropperVisible: true })}/>


          </ImageBackground>
        }

        {this.state.image &&

          <View style={registerUserStyle.submitContainer}>
          <GlobalButton
             buttonTitle="Submit"
              onPress={() => this.processRegistration()}/>
          </View>

        }

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
